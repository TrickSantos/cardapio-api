import { Product } from '@domain/entities/place/product/product';

export abstract class ProductRepository {
    abstract create(product: Product): Promise<void>;
    abstract update(product: Product): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Product | null>;
    abstract findAll(): Promise<Product[]>;
    abstract addCategory(productId: string, categoryId: string): Promise<void>;
}
