import { Category } from '@domain/entities/place/category/category';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';

type Payload = {
    placeId?: string;
    isActive?: boolean;
};
@Injectable()
export class ListAllCategoriesUseCase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(props?: Payload): Promise<Category[]> {
        return this.categoryRepository.findAll(props);
    }
}
