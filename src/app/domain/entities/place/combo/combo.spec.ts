import { describe, it, expect } from 'vitest';
import { Price } from '../price/price';
import { Product } from '../product/product';
import { Combo } from './combo';
import { makePrice } from '@test/factories/price.factory';

describe('Combo', () => {
    it('should create a valid combo', () => {
        const combo = new Combo({
            placeId: 'placeId',
            name: 'name',
            description: 'description',
            price: makePrice({ value: 10 }),
            isActive: true,
        });

        expect(combo).toBeInstanceOf(Combo);
        expect(combo.id).toBeDefined();
        expect(combo.placeId).toBe('placeId');
        expect(combo.name).toBe('name');
        expect(combo.description).toBe('description');
        expect(combo.price).toBeInstanceOf(Price);
        expect(combo.products).toEqual([]);
        expect(combo.isActive).toBe(true);
        expect(combo.createdAt).toBeInstanceOf(Date);
        expect(combo.updatedAt).toBeInstanceOf(Date);
    });

    it('should create a valid combo with products', () => {
        const combo = new Combo({
            placeId: 'placeId',
            name: 'name',
            description: 'description',
            price: makePrice({ value: 10 }),
            isActive: true,
            products: [
                new Product({
                    placeId: 'placeId',
                    name: 'name',
                    description: 'description',
                    price: new Price({
                        value: 10,
                        isActive: true,
                        productId: 'productId',
                    }),
                    isActive: true,
                }),
            ],
        });

        expect(combo).toBeInstanceOf(Combo);
        expect(combo.id).toBeDefined();
        expect(combo.placeId).toBe('placeId');
        expect(combo.name).toBe('name');
        expect(combo.description).toBe('description');
        expect(combo.price).toBeInstanceOf(Price);
        expect(combo.products).toHaveLength(1);
        expect(combo.products[0]).toBeInstanceOf(Product);
        expect(combo.isActive).toBe(true);
        expect(combo.createdAt).toBeInstanceOf(Date);
        expect(combo.updatedAt).toBeInstanceOf(Date);
    });
});
