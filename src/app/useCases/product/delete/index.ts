import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@domain/repositories/product.repository';
import { ProductNotFound } from '@useCases/errors/ProductNotFound';

@Injectable()
export class DeleteProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(id: string) {
        const product = await this.productRepository.findById(id);
        if (product) {
            return this.productRepository.delete(id);
        } else {
            throw new ProductNotFound();
        }
    }
}
