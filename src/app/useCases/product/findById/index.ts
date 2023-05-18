import { Product } from '@domain/entities/place/product/product';
import { ProductRepository } from '@domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { ProductNotFound } from '@useCases/errors/ProductNotFound';

@Injectable()
export class FindProductByIdUseCase {
    constructor(private readonly categoryRepository: ProductRepository) {}

    async execute(id: string): Promise<Product> {
        const user = await this.categoryRepository.findById(id);
        if (user) {
            return user;
        } else {
            throw new ProductNotFound();
        }
    }
}
