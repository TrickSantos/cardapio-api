import { describe, it, expect } from 'vitest';
import { makeProduct } from '@test/factories/product.factory';
import { Category } from '../category/category';
import { Price } from '../price/price';

describe('Product', () => {
    it('should create an instance', () => {
        const product = makeProduct();
        expect(product).toBeTruthy();
        expect(product.id).toBeDefined();
        expect(product.createdAt).toBeDefined();
    });

    it('should create an instance with price', () => {
        const product = makeProduct({
            price: new Price({
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
        const product = makeProduct({
            priceHistory: [
                new Price({
                    productId: 'test',
                    value: 10,
                    isActive: false,
                }),
                new Price({
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
        const product = makeProduct({
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
        const product = makeProduct({
            name: 'test',
            placeId: 'test',
            description: 'test',
            isActive: true,
        });
        const primitives = product.toJSON();

        expect(primitives).toBeDefined();
        expect(primitives.name).toBe('test');
        expect(primitives.placeId).toBe('test');
        expect(primitives.description).toBe('test');
        expect(primitives.isActive).toBe(true);
    });
});
