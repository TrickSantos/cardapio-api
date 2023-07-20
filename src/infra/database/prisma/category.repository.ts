import { Category } from '@domain/entities/place/category/category';
import {
    CategoryRepository,
    FindAllPayload,
} from '@domain/repositories/category.repository';
import { CategoryMapper } from '@mappers/category.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
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

    async findAll(props?: FindAllPayload): Promise<Category[]> {
        const { placeId, isActive } = props || {};

        const categories = await this.prisma.category.findMany({
            where: {
                ...(isActive && { isActive }),
                ...(placeId && { placeId }),
            },
        });
        return categories.map(CategoryMapper.toDomain);
    }
}
