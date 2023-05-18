import { describe, afterEach, it, expect } from 'vitest';
import { InMemoryProductRepository } from '@infra/database/inMemory/product.repository';
import { makeProduct } from '@test/factories/product.factory';
import { ProductNotFound } from '@useCases/errors/ProductNotFound';
import { DeleteProductUseCase } from '.';

describe('Delete Product', () => {
    const repository = new InMemoryProductRepository();
    const useCase = new DeleteProductUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should delete a category', async () => {
        const category = makeProduct();
        await repository.create(category);
        await useCase.execute(category.id);
        const categories = await repository.findAll();
        expect(categories).toHaveLength(0);
    });

    it('should throw an error if category not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            ProductNotFound,
        );
    });
});
