import { Category } from '../category/category';
import { Price } from '../price/price';
import { Product } from './product';

describe('Product', () => {
    it('should create an instance', () => {
        const product = new Product({
            name: 'test',
            placeId: 'test',
            description: 'test',
            isActive: true,
        });
        expect(product).toBeTruthy();
        expect(product.id).toBeDefined();
        expect(product.createdAt).toBeDefined();
    });

    it('should create an instance with price', () => {
        const product = new Product({
            name: 'test',
            placeId: 'test',
            description: 'test',
            isActive: true,
            price: new Price({
                placeId: 'test',
                productId: 'test',
                value: 10,
                isActive: true,
            }),
        });
        expect(product).toBeTruthy();
        expect(product.id).toBeDefined();
        expect(product.createdAt).toBeDefined();
        expect(product.price).toBeDefined();
    });

    it('should create an instance with price history', () => {
        const product = new Product({
            name: 'test',
            placeId: 'test',
            description: 'test',
            isActive: true,
            priceHistory: [
                new Price({
                    placeId: 'test',
                    productId: 'test',
                    value: 10,
                    isActive: true,
                }),
                new Price({
                    placeId: 'test',
                    productId: 'test',
                    value: 20,
                    isActive: true,
                }),
            ],
        });
        expect(product).toBeTruthy();
        expect(product.id).toBeDefined();
        expect(product.createdAt).toBeDefined();
        expect(product.priceHistory).toBeDefined();
        expect(product.priceHistory.length).toBe(2);
    });

    it('should create an instance with categories', () => {
        const product = new Product({
            name: 'test',
            placeId: 'test',
            description: 'test',
            isActive: true,
            categories: [
                new Category({
                    name: 'category 1',
                    placeId: 'test',
                    isActive: true,
                }),
                new Category({
                    name: 'category 2',
                    placeId: 'test',
                    isActive: true,
                }),
            ],
        });
        expect(product).toBeTruthy();
        expect(product.id).toBeDefined();
        expect(product.createdAt).toBeDefined();
        expect(product.categories).toBeDefined();
        expect(product.categories.length).toBe(2);
    });

    it('should be able to return the primitive values', () => {
        const product = new Product({
            name: 'test',
            placeId: 'test',
            description: 'test',
            isActive: true,
        });
        const primitives = product.toPrimitives();

        expect(primitives).toBeDefined();
        expect(primitives.name).toBe('test');
        expect(primitives.placeId).toBe('test');
        expect(primitives.description).toBe('test');
        expect(primitives.isActive).toBe(true);
    });
});
