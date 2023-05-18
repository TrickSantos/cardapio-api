import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { Category } from '@domain/entities/place/category/category';
import { InMemoryCategoryRepository } from '@infra/database/inMemory/category.repository';
import { makeCategory } from '@test/factories/category.factory';
import { ListAllCategoriesUseCase } from '.';

describe('List All Categories', () => {
    let category: Category;
    const repository = new InMemoryCategoryRepository();
    const useCase = new ListAllCategoriesUseCase(repository);

    beforeEach(() => {
        Array.from({ length: 10 }).forEach(() => {
            category = makeCategory();
            repository.create(category);
        });
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all categories', async () => {
        const response = await useCase.execute();
        expect(response).toHaveLength(10);
    });
});
