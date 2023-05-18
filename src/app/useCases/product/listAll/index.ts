import { Product } from '@domain/entities/place/product/product';
import { ProductRepository } from '@domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllProductsUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(): Promise<Product[]> {
        return this.productRepository.findAll();
    }
}
