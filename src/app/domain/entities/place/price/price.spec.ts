import { describe, it, expect } from 'vitest';
import { Price } from './price';

describe('Price', () => {
    it('should create a valid price', () => {
        const price = new Price({
            productId: 'productId',
            value: 10,
            isActive: true,
        });

        expect(price.id).toBeDefined();
        expect(price.productId).toBe('productId');
        expect(price.value).toBe(10);
        expect(price.isActive).toBe(true);
        expect(price.createdAt).toBeDefined();
        expect(price.updatedAt).toBeDefined();
    });
});
