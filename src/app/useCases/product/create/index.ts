import { Category } from '@domain/entities/place/category/category';
import { Price } from '@domain/entities/place/price/price';
import { Product } from '@domain/entities/place/product/product';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { ProductRepository } from '@domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';

type CreateProductDTO = {
    placeId: string;
    name: string;
    description: string;
    categories: string[];
    photos: string[];
    price?: number;
};

@Injectable()
export class CreateProductUseCase {
    constructor(
        private placeRepository: ProductRepository,
        private categoryRepository: CategoryRepository,
    ) {}

    async execute({ categories, ...data }: CreateProductDTO): Promise<void> {
        const requests = categories.map((id) =>
            this.categoryRepository.findById(id),
        );

        const results = await Promise.all(requests);

        const categorias = results.filter(
            (category) => category !== null,
        ) as Category[];

        const product = new Product({
            placeId: data.placeId,
            name: data.name,
            description: data.description,
            categories: categorias,
            photos: data.photos,
            isActive: true,
            price: null,
        });

        if (data.price) {
            const price = new Price({
                value: data.price,
                productId: product.id,
            });
            product.update({ price });
        }

        return this.placeRepository.create(product);
    }
}
