import { Category } from '@domain/entities/place/category/category';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { CategoryMapper } from '@mappers/category.mapper';
import { PrismaService } from './prisma.service';

export class PrismaCategoryRepository implements CategoryRepository {
    constructor(private prisma: PrismaService) {}

    async create(category: Category): Promise<void> {
        const data = CategoryMapper.toPersistence(category);
        await this.prisma.category.create({
            data,
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
            return CategoryMapper.toDomain(category);
        }
        return null;
    }

    async findAll(): Promise<Category[]> {
        const categories = await this.prisma.category.findMany();
        return categories.map(CategoryMapper.toDomain);
    }
}
