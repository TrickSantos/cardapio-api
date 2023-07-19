import { Product } from '@domain/entities/place/product/product';
import {
    Category,
    Image,
    Price,
    Product as PrismaProduct,
} from '@prisma/client';
import { CategoryMapper } from './category.mapper';
import { PriceMapper } from './price.mapper';

type ProductPersistence = PrismaProduct & {
    price?: Price[];
    categories?: Category[];
    images?: Image[];
};

export class ProductMapper {
    static toPersistence(product: Product) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            placeId: product.placeId,
            ...(product.categories && {
                categories: product.categories.map(
                    CategoryMapper.toPersistence,
                ),
            }),
            ...(product.price && {
                price: PriceMapper.toPersistence(product.price),
            }),
            ...(product.photos && {
                images: product.photos?.map((photo) => ({ url: photo })),
            }),
            isActive: product.isActive,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
    static toDomain(product: ProductPersistence): Product {
        const categories = product.categories?.map(CategoryMapper.toDomain);
        const price = product.price?.filter((p) => p.isActive)[0];
        const priceHistory = product.price?.filter((p) => !p.isActive);

        const p = new Product(
            {
                name: product.name,
                description: product.description,
                placeId: product.placeId,
                price: price ? PriceMapper.toDomain(price) : null,
                categories,
                photos: product.images?.map((image) => image.url),
                priceHistory: product.price
                    ? priceHistory?.map(PriceMapper.toDomain)
                    : [],
                isActive: product.isActive,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            },
            product.id,
        );

        return p;
    }
}
