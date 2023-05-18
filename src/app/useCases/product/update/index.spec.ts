import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { Product } from '@domain/entities/place/product/product';
import { InMemoryCategoryRepository } from '@infra/database/inMemory/category.repository';
import { InMemoryProductRepository } from '@infra/database/inMemory/product.repository';
import { makeProduct } from '@test/factories/product.factory';
import { ProductNotFound } from '@useCases/errors/ProductNotFound';
import { UpdateProductUseCase } from '.';

describe('Update Product', () => {
    let product: Product;
    const repository = new InMemoryProductRepository();
    const category = new InMemoryCategoryRepository();
    const useCase = new UpdateProductUseCase(repository, category);

    beforeEach(() => {
        product = makeProduct();
        repository.create(product);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should update a category', async () => {
        const updatedProduct = makeProduct();
        await useCase.execute({
            id: product.id,
            name: updatedProduct.name,
            placeId: updatedProduct.placeId,
        });
        const foundProduct = await repository.findById(product.id);
        expect(foundProduct).toBeDefined();
        expect(foundProduct?.name).toEqual(updatedProduct.name);
    });

    it('should throw an error if category not found', async () => {
        const updatedProduct = makeProduct();
        await expect(
            useCase.execute({
                ...updatedProduct,
                id: 'invalid-id',
            }),
        ).rejects.toThrow(ProductNotFound);
    });
});
