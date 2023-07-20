import { Category } from '@domain/entities/place/category/category';

export type FindAllPayload = {
    placeId?: string;
    isActive?: boolean;
};

export abstract class CategoryRepository {
    abstract create(category: Category): Promise<void>;
    abstract update(category: Category): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Category | null>;
    abstract findAll(props?: FindAllPayload): Promise<Category[]>;
}
