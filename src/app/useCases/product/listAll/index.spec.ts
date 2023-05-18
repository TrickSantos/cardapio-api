import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { Product } from '@domain/entities/place/product/product';
import { InMemoryProductRepository } from '@infra/database/inMemory/product.repository';
import { makeProduct } from '@test/factories/product.factory';
import { ListAllProductsUseCase } from '.';

describe('List All Products', () => {
    let product: Product;
    const repository = new InMemoryProductRepository();
    const useCase = new ListAllProductsUseCase(repository);

    beforeEach(() => {
        Array.from({ length: 10 }).forEach(() => {
            product = makeProduct();
            repository.create(product);
        });
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all products', async () => {
        const response = await useCase.execute();
        expect(response).toHaveLength(10);
    });
});
