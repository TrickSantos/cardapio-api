import { Category } from '@domain/entities/place/category/category';
import { Product } from '@domain/entities/place/product/product';
import { ProductRepository } from '@domain/repositories/product.repository';
import { makeCategory } from '@test/factories/category.factory';

export class InMemoryProductRepository implements ProductRepository {
    private products: Product[] = [];

    async create(product: Product): Promise<void> {
        this.products.push(product);
    }

    async update(product: Product): Promise<void> {
        const current = this.products.find((u) => u.id === product.id);
        if (current) {
            current.update(product);
        }
    }

    async delete(id: string): Promise<void> {
        const current = this.products.find((u) => u.id === id);
        if (current) {
            current.update({ isActive: false });
        }
    }

    async findById(id: string): Promise<Product | null> {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        }
        return null;
    }

    async findAll(): Promise<Product[]> {
        return this.products.filter((product) => product.isActive);
    }

    async addCategory(productId: string, categoryId: string): Promise<void> {
        const product = this.products.find(
            (product) => product.id === productId,
        );

        if (product) {
            const category = new Category(
                { ...makeCategory().toJSON() },
                categoryId,
            );
            product.update({
                categories: [...product.categories, category],
            });
        }
    }

    reset() {
        this.products = [];
    }
}
