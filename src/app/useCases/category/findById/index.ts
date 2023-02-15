import { Category } from '@domain/entities/place/category/category';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';
import { CategoryNotFound } from '@useCases/errors/CategoryNotFound';

@Injectable()
export class FindCategoryByIdUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute(id: string): Promise<Category> {
        const user = await this.categoryRepository.findById(id);
        if (user) {
            return user;
        } else {
            throw new CategoryNotFound();
        }
    }
}
