import { describe, afterEach, it, expect } from 'vitest';
import { Product } from '@domain/entities/place/product/product';
import { InMemoryProductRepository } from '@infra/database/inMemory/product.repository';
import { makeProduct } from '@test/factories/product.factory';
import { ProductNotFound } from '@useCases/errors/ProductNotFound';
import { FindProductByIdUseCase } from '.';

describe('FindProductById', () => {
    let product: Product;
    const repository = new InMemoryProductRepository();
    const useCase = new FindProductByIdUseCase(repository);

    beforeEach(() => {
        product = makeProduct();
        repository.create(product);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should find a product by id', async () => {
        const response = await useCase.execute(product.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(product.id);
        expect(response.name).toEqual(product.name);
    });

    it('should throw an error if product not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            ProductNotFound,
        );
    });
});
