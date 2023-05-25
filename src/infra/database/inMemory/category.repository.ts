import { Category } from '@domain/entities/place/category/category';
import { CategoryRepository } from '@domain/repositories/category.repository';

export class InMemoryCategoryRepository implements CategoryRepository {
    private category: Category[] = [];

    async create(category: Category): Promise<void> {
        this.category.push(category);
    }

    async update(category: Category): Promise<void> {
        const current = this.category.find((u) => u.id === category.id);
        if (current) {
            current.update(category);
        }
    }

    async findById(id: string): Promise<Category | null> {
        const category = this.category.find((Category) => Category.id === id);
        if (category) {
            return category;
        }
        return null;
    }

    async findAll(): Promise<Category[]> {
        return this.category.filter((Category) => Category.isActive);
    }

    async delete(id: string): Promise<void> {
        const current = this.category.find((Category) => Category.id === id);
        if (current) {
            current.update({ isActive: false });
        }
    }

    reset() {
        this.category = [];
    }
}
