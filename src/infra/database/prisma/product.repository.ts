import { Product } from '@domain/entities/place/product/product';
import { Price } from '@domain/entities/place/price/price';
import { ProductRepository } from '@domain/repositories/product.repository';
import { PrismaService } from './prisma.service';

export class PrismaProductRepository implements ProductRepository {
    constructor(private prisma: PrismaService) {}

    async create(product: Product): Promise<void> {
        await this.prisma.product.create({
            data: {
                id: product.id,
                name: product.name,
                description: product.description,
                isActive: product.isActive,
                placeId: product.placeId,
            },
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
            return new Product(
                {
                    name: product.name,
                    description: product.description,
                    isActive: product.isActive,
                    placeId: product.placeId,
                    price: new Price(
                        {
                            ...product.price.filter((p) => p.isActive)[0],
                        },
                        product.price.filter((p) => p.isActive)[0].id,
                    ),
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                },
                id,
            );
        }
        return null;
    }
    async findAll(): Promise<Product[]> {
        const products = await this.prisma.product.findMany({
            include: {
                price: true,
            },
        });
        return products.map(
            (product) =>
                new Product(
                    {
                        name: product.name,
                        description: product.description,
                        isActive: product.isActive,
                        placeId: product.placeId,
                        price: new Price(
                            {
                                ...product.price.filter((p) => p.isActive)[0],
                            },
                            product.price.filter((p) => p.isActive)[0].id,
                        ),
                        createdAt: product.createdAt,
                        updatedAt: product.updatedAt,
                    },
                    product.id,
                ),
        );
    }
}
