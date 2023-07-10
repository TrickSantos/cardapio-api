import { Category } from '@domain/entities/place/category/category';
import { Prisma, Category as CategoryPersistence } from '@prisma/client';

export class CategoryMapper {
    static toPersistence(
        category: Category,
    ): Prisma.CategoryUncheckedCreateInput {
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