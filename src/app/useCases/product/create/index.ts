import { Category } from '@domain/entities/place/category/category';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { ProductRepository } from '@domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { makePrice } from '@test/factories/price.factory';
import { makeProduct } from '@test/factories/product.factory';

type CreateProductDTO = {
    placeId: string;
    name: string;
    description: string;
    categories: string[];
    price?: {
        placeId: string;
        value: number;
    };
};

@Injectable()
export class CreateProductUseCase {
    constructor(
        private placeRepository: ProductRepository,
        private categoryRepository: CategoryRepository,
    ) {}

    async execute({ categories, ...data }: CreateProductDTO): Promise<void> {
        const requests = categories.map((id) => {
            return this.categoryRepository.findById(id);
        });

        const results = await Promise.all(requests);

        const categorias = results.filter(
            (category) => category !== null,
        ) as Category[];

        const product = makeProduct({
            placeId: data.placeId,
            name: data.name,
            description: data.description,
            categories: categorias,
        });

        if (data.price) {
            const price = makePrice({
                value: data.price.value,
                placeId: data.placeId,
                productId: product.id,
            });
            product.update({ price });
        }

        return this.placeRepository.create(product);
    }
}
