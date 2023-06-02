import { ProductRepository } from '@domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';

type AddCategoryDTO = {
    productId: string;
    categoryId: string;
};

@Injectable()
export class CreateProductUseCase {
    constructor(private placeRepository: ProductRepository) {}

    async execute({ categoryId, productId }: AddCategoryDTO): Promise<void> {
        await this.placeRepository.addCategory(productId, categoryId);
    }
}
