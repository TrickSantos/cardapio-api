import { CategoryRepository } from '@domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';
import { CategoryNotFound } from '@useCases/errors/CategoryNotFound';

@Injectable()
export class DeleteCategoryUseCase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(id: string) {
        const place = await this.categoryRepository.findById(id);
        if (place) {
            return this.categoryRepository.delete(id);
        } else {
            throw new CategoryNotFound();
        }
    }
}
