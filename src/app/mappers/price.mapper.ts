import { Price } from '@domain/entities/place/price/price';
import { Price as PrismaPrice } from '@prisma/client';

export class PriceMapper {
    static toPersistence(price: Price): PrismaPrice {
        return {
            id: price.id,
            productId: price.productId,
            value: price.value,
            isActive: price.isActive,
            createdAt: price.createdAt,
            updatedAt: price.updatedAt,
        };
    }

    static toDomain(price: PrismaPrice): Price {
        return new Price(
            {
                productId: price.productId,
                value: price.value,
                isActive: price.isActive,
                createdAt: price.createdAt,
                updatedAt: price.updatedAt,
            },
            price.id,
        );
    }
}
