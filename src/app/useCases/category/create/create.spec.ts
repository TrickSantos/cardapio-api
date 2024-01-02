import { describe, afterEach, it, expect } from 'vitest';
import { InMemoryCategoryRepository } from '@infra/database/inMemory/category.repository';
import { makeCategory } from '@test/factories/category.factory';
import { CreateCategoryUseCase } from '.';

describe('Create Category', () => {
    const category = makeCategory();
    const repository = new InMemoryCategoryRepository();
    const useCase = new CreateCategoryUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a category', async () => {
        await useCase.execute(category);
        const categoryes = await repository.findAll();
        expect(categoryes).toHaveLength(1);
    });
});
