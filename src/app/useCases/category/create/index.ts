import { Category } from '@domain/entities/place/category/category';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';

type CreateCategoryDTO = {
    placeId: string;
    name: string;
};

@Injectable()
export class CreateCategoryUseCase {
    constructor(private placeRepository: CategoryRepository) {}

    async execute(data: CreateCategoryDTO): Promise<void> {
        const category = new Category({
            placeId: data.placeId,
            name: data.name,
            isActive: true,
        });

        return this.placeRepository.create(category);
    }
}
