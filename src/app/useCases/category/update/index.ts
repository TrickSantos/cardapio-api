import { CategoryRepository } from '@domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';
import { CategoryNotFound } from '@useCases/errors/CategoryNotFound';

type UpdateCategoryDTO = {
    id: string;
    placeId?: string;
    name?: string;
    isActive?: boolean;
};

@Injectable()
export class UpdateCategoryUseCase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(data: UpdateCategoryDTO) {
        const user = await this.categoryRepository.findById(data.id);
        if (user) {
            user.update({
                ...data,
            });
            return this.categoryRepository.update(user);
        } else {
            throw new CategoryNotFound();
        }
    }
}
