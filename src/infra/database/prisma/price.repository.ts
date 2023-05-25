import { Price } from '@domain/entities/place/price/price';
import { PriceRepository } from '@domain/repositories/price.repository';
import { PrismaService } from './prisma.service';

export class PrismaPriceRepository implements PriceRepository {
    constructor(private prisma: PrismaService) {}

    async create(price: Price): Promise<void> {
        await this.prisma.price.create({
            data: {
                id: price.id,
                value: price.value,
                isActive: price.isActive,
                productId: price.productId,
            },
        });
    }

    async update(price: Price): Promise<void> {
        await this.prisma.price.update({
            where: { id: price.id },
            data: {
                value: price.value,
                isActive: price.isActive,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.price.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }

    async findById(id: string): Promise<Price | null> {
        const price = await this.prisma.price.findUnique({
            where: { id },
        });
        if (price) {
            return new Price(
                {
                    value: price.value,
                    isActive: price.isActive,
                    productId: price.productId,
                    createdAt: price.createdAt,
                    updatedAt: price.updatedAt,
                },
                id,
            );
        }
        return null;
    }

    async findAll(): Promise<Price[]> {
        const prices = await this.prisma.price.findMany();
        return prices.map(
            (price) =>
                new Price(
                    {
                        value: price.value,
                        isActive: price.isActive,
                        productId: price.productId,
                        createdAt: price.createdAt,
                        updatedAt: price.updatedAt,
                    },
                    price.id,
                ),
        );
    }
}
