import { Category } from '@domain/entities/place/category/category';
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
};

@Injectable()
export class UpdateProductUseCase {
    constructor(
        private repository: ProductRepository,
        private categoryRepository: CategoryRepository,
    ) {}

    async execute({ categories, ...data }: UpdateProductDTO) {
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

        product.update({ ...data });

        return this.repository.update(product);
    }
}
