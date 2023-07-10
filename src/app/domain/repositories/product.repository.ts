import { Product } from '@domain/entities/place/product/product';

export type FindAllPayload = {
    placeId?: string;
    photos?: boolean;
};

export abstract class ProductRepository {
    abstract create(product: Product): Promise<void>;
    abstract update(product: Product): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Product | null>;
    abstract findAll(props?: FindAllPayload): Promise<Product[]>;
    abstract addCategory(productId: string, categoryId: string): Promise<void>;
}
