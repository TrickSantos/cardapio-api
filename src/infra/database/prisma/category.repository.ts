import { Category } from '@domain/entities/place/category/category';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { PrismaService } from './prisma.service';

export class PrismaCategoryRepository implements CategoryRepository {
    constructor(private prisma: PrismaService) {}

    async create(category: Category): Promise<void> {
        await this.prisma.category.create({
            data: {
                id: category.id,
                name: category.name,
                isActive: category.isActive,
                placeId: category.placeId,
            },
        });
    }

    async update(category: Category): Promise<void> {
        await this.prisma.category.update({
            where: { id: category.id },
            data: {
                name: category.name,
                isActive: category.isActive,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.category.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }

    async findById(id: string): Promise<Category | null> {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });

        if (category) {
            return new Category(
                {
                    name: category.name,
                    isActive: category.isActive,
                    placeId: category.placeId,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                },
                id,
            );
        }
        return null;
    }

    async findAll(): Promise<Category[]> {
        const categories = await this.prisma.category.findMany();
        return categories.map(
            (category) =>
                new Category(
                    {
                        name: category.name,
                        isActive: category.isActive,
                        placeId: category.placeId,
                        createdAt: category.createdAt,
                        updatedAt: category.updatedAt,
                    },
                    category.id,
                ),
        );
    }
}
