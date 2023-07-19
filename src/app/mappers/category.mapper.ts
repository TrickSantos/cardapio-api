import { Category } from '@domain/entities/place/category/category';
import { Category as CategoryPersistence } from '@prisma/client';

export class CategoryMapper {
    static toPersistence(category: Category): CategoryPersistence {
        return {
            id: category.id,
            name: category.name,
            placeId: category.placeId,
            isActive: category.isActive,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    }

    static toDomain(category: CategoryPersistence): Category {
        return new Category(
            {
                name: category.name,
                placeId: category.placeId,
                isActive: category.isActive,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            },
            category.id,
        );
    }
}
