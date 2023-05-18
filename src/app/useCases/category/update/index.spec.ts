import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { Category } from '@domain/entities/place/category/category';
import { InMemoryCategoryRepository } from '@infra/database/inMemory/category.repository';
import { makeCategory } from '@test/factories/category.factory';
import { CategoryNotFound } from '@useCases/errors/CategoryNotFound';
import { UpdateCategoryUseCase } from '.';

describe('Update Category', () => {
    let category: Category;
    const repository = new InMemoryCategoryRepository();
    const useCase = new UpdateCategoryUseCase(repository);

    beforeEach(() => {
        category = makeCategory();
        repository.create(category);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should update a category', async () => {
        const updatedCategory = makeCategory();
        await useCase.execute({
            id: category.id,
            name: updatedCategory.name,
        });
        const foundCategory = await repository.findById(category.id);
        expect(foundCategory).toBeDefined();
        expect(foundCategory?.name).toEqual(updatedCategory.name);
    });

    it('should throw an error if category not found', async () => {
        await expect(
            useCase.execute({ ...makeCategory(), id: 'invalid-id' }),
        ).rejects.toThrow(CategoryNotFound);
    });
});
