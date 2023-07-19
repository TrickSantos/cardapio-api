import { Product } from '@domain/entities/place/product/product';
import {
    FindAllPayload,
    ProductRepository,
} from '@domain/repositories/product.repository';
import { PrismaService } from './prisma.service';
import { ProductMapper } from '@mappers/product.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
    constructor(private prisma: PrismaService) {}

    async create(product: Product): Promise<void> {
        const data = ProductMapper.toPersistence(product);
        await this.prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                placeId: data.placeId,
                categories: {
                    connect: data.categories?.map((category) => ({
                        id: category.id,
                    })),
                },
                ...(data.price && {
                    price: {
                        create: {
                            value: data.price.value,
                            id: data.price.id,
                            createdAt: data.price.createdAt,
                            isActive: data.price.isActive,
                            updatedAt: data.price.updatedAt,
                        },
                    },
                }),
                ...(data.images && {
                    images: {
                        createMany: {
                            skipDuplicates: true,
                            data: data.images.map((image) => ({
                                url: image.url,
                            })),
                        },
                    },
                }),
                isActive: data.isActive,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            },
        });
    }

    async update(product: Product): Promise<void> {
        const data = ProductMapper.toPersistence(product);

        await this.prisma.product.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                description: data.description,
                categories: {
                    set: data.categories?.map((category) => ({
                        id: category.id,
                    })),
                },
                ...(data.price && {
                    price: {
                        create: {
                            value: data.price.value,
                            id: data.price.id,
                            isActive: data.price.isActive,
                            createdAt: data.price.createdAt,
                            updatedAt: data.price.updatedAt,
                        },
                    },
                }),
                ...(data.images && {
                    images: {
                        createMany: {
                            data: data.images.map((image) => ({
                                url: image.url,
                            })),
                        },
                    },
                }),
                isActive: data.isActive,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
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

    async findAll(props: FindAllPayload): Promise<Product[]> {
        const { placeId, photos = false } = props || {};

        const products = await this.prisma.product.findMany({
            where: {
                isActive: true,
                ...(placeId && { placeId }),
            },
            include: {
                categories: true,
                price: true,
                images: photos,
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
