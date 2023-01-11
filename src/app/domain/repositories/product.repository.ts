import { Product } from '@domain/entities/place/product/product';

export abstract class ProductRepository {
    abstract create(product: Product): Promise<void>;
    abstract update(product: Product): Promise<void>;
    abstract delete(product: Product): Promise<void>;
    abstract findById(id: string): Promise<Product>;
    abstract findAll(): Promise<Product[]>;
}
