import { describe, afterEach, it, expect } from 'vitest';
import { Category } from '@domain/entities/place/category/category';
import { InMemoryCategoryRepository } from '@infra/database/inMemory/category.repository';
import { makeCategory } from '@test/factories/category.factory';
import { CreateCategoryUseCase } from '.';

describe('Create Category', () => {
    let category: Category;
    const repository = new InMemoryCategoryRepository();
    const useCase = new CreateCategoryUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a category', async () => {
        category = makeCategory();
        await useCase.execute(category);
        const categoryes = await repository.findAll();
        expect(categoryes).toHaveLength(1);
        expect(categoryes[0].name).toEqual(category.name);
    });
});
