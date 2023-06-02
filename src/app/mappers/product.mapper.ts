import { Product } from '@domain/entities/place/product/product';
import {
    Category,
    Price,
    Prisma,
    Product as PrismaProduct,
} from '@prisma/client';
import { CategoryMapper } from './category.mapper';
import { PriceMapper } from './price.mapper';

type ProductPersistence = PrismaProduct & {
    price?: Price[];
    categories?: Category[];
};

export class ProductMapper {
    static toPersistence(product: Product): Prisma.ProductUncheckedCreateInput {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            placeId: product.placeId,
            isActive: product.isActive,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
    static toDomain(product: ProductPersistence): Product {
        const categories = product.categories?.map(CategoryMapper.toDomain);
        const price = product.price?.filter((p) => p.isActive)[0];
        const priceHistory = product.price?.filter((p) => !p.isActive);

        return new Product(
            {
                name: product.name,
                description: product.description,
                placeId: product.placeId,
                price: price ? PriceMapper.toDomain(price) : null,
                categories,
                priceHistory: product.price
                    ? priceHistory?.map(PriceMapper.toDomain)
                    : [],
                isActive: product.isActive,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            },
            product.id,
        );
    }
}
