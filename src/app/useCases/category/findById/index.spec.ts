import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { Category } from '@domain/entities/place/category/category';
import { InMemoryCategoryRepository } from '@infra/database/inMemory/category.repository';
import { makeCategory } from '@test/factories/category.factory';
import { CategoryNotFound } from '@useCases/errors/CategoryNotFound';
import { FindCategoryByIdUseCase } from '.';

describe('FindCategoryById', () => {
    let category: Category;
    const repository = new InMemoryCategoryRepository();
    const useCase = new FindCategoryByIdUseCase(repository);

    beforeEach(() => {
        category = makeCategory();
        repository.create(category);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should find a category by id', async () => {
        const response = await useCase.execute(category.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(category.id);
        expect(response.name).toEqual(category.name);
    });

    it('should throw an error if category not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            CategoryNotFound,
        );
    });
});
