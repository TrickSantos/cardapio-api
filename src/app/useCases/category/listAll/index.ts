import { Category } from '@domain/entities/place/category/category';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllCategoriesUseCase {
    constructor(private placeRepository: CategoryRepository) {}

    async execute(): Promise<Category[]> {
        return this.placeRepository.findAll();
    }
}
