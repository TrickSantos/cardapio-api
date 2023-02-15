import { Category } from '@domain/entities/place/category/category';
import { InMemoryCategoryRepository } from '@infra/database/inMemory/category.repository';
import { makeCategory } from '@test/factories/category.factory';
import { CategoryNotFound } from '@useCases/errors/CategoryNotFound';
import { DeleteCategoryUseCase } from '.';

describe('Delete Category', () => {
    let category: Category;
    const repository = new InMemoryCategoryRepository();
    const useCase = new DeleteCategoryUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should delete a category', async () => {
        category = makeCategory();
        await repository.create(category);
        await useCase.execute(category.id);
        const categories = await repository.findAll();
        expect(categories).toHaveLength(0);
    });

    it('should throw an error if category not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            CategoryNotFound,
        );
    });
});
