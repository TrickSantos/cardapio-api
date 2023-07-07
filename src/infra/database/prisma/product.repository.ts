import { Product } from '@domain/entities/place/product/product';
import { ProductRepository } from '@domain/repositories/product.repository';
import { PrismaService } from './prisma.service';
import { ProductMapper } from '@mappers/product.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
    constructor(private prisma: PrismaService) {}

    async create(product: Product): Promise<void> {
        const data = ProductMapper.toPersistence(product);
        await this.prisma.product.create({
            data,
        });
    }

    async update(product: Product): Promise<void> {
        await this.prisma.product.update({
            where: { id: product.id },
            data: {
                name: product.name,
                description: product.description,
                isActive: product.isActive,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.product.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }

    async findById(id: string): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                price: true,
            },
        });

        if (product) {
            return ProductMapper.toDomain(product);
        }
        return null;
    }

    async findAll(): Promise<Product[]> {
        const products = await this.prisma.product.findMany({
            include: {
                price: true,
            },
        });
        return products.map(ProductMapper.toDomain);
    }

    async addCategory(productId: string, categoryId: string): Promise<void> {
        await this.prisma.product.update({
            where: { id: productId },
            data: {
                categories: {
                    connect: {
                        id: categoryId,
                    },
                },
            },
        });
    }
}
