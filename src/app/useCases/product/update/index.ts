import { Category } from '@domain/entities/place/category/category';
import { Price } from '@domain/entities/place/price/price';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { ProductRepository } from '@domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { ProductNotFound } from '@useCases/errors/ProductNotFound';

type UpdateProductDTO = {
    id: string;
    placeId?: string;
    name?: string;
    description?: string;
    categories?: string[];
    price?: number;
};

@Injectable()
export class UpdateProductUseCase {
    constructor(
        private repository: ProductRepository,
        private categoryRepository: CategoryRepository,
    ) {}

    async execute({ categories, price, ...data }: UpdateProductDTO) {
        const product = await this.repository.findById(data.id);

        if (!product) throw new ProductNotFound();

        if (categories) {
            const requests = categories?.map((id) => {
                return this.categoryRepository.findById(id);
            });

            const results = await Promise.all(requests);

            const categorias = results.filter(
                (category) => category !== null,
            ) as Category[];

            product.update({ categories: categorias });
        }

        product.update({
            ...data,
            price: price
                ? new Price({ productId: data.id, value: price })
                : null,
        });

        return this.repository.update(product);
    }
}
