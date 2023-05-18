import { describe, afterEach, it, expect } from 'vitest';
import { InMemoryCategoryRepository } from '@infra/database/inMemory/category.repository';
import { InMemoryProductRepository } from '@infra/database/inMemory/product.repository';
import { CreateProductUseCase } from '.';

describe('Create Product', () => {
    const repository = new InMemoryProductRepository();
    const categoryRepository = new InMemoryCategoryRepository();
    const useCase = new CreateProductUseCase(repository, categoryRepository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a product', async () => {
        await useCase.execute({
            name: 'product',
            description: 'description',
            categories: [],
            placeId: 'placeId',
        });
        const categoryes = await repository.findAll();
        expect(categoryes).toHaveLength(1);
        expect(categoryes[0].id).toBeDefined();
    });
});
