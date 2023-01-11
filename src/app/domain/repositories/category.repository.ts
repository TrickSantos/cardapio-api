import { Category } from '@domain/entities/place/category/category';

export abstract class CategoryRepository {
    abstract create(category: Category): Promise<void>;
    abstract update(category: Category): Promise<void>;
    abstract delete(category: Category): Promise<void>;
    abstract findById(id: string): Promise<Category>;
    abstract findAll(): Promise<Category[]>;
}
