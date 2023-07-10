import { Product } from '@domain/entities/place/product/product';
import { ProductRepository } from '@domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';

type Payload = {
    placeId?: string;
    photos?: boolean;
};

@Injectable()
export class ListAllProductsUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(props?: Payload): Promise<Product[]> {
        return this.productRepository.findAll(props);
    }
}
