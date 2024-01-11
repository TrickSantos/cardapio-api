import { makeProduct } from '@test/factories/product.factory';
import { Item } from './item';
import { makePrice } from '@test/factories/price.factory';
import { makeCombo } from '@test/factories/combo.factory';
import { Product } from '../../product/product';
import { Combo } from '../../combo/combo';

describe('Item', () => {
    let product: Item;
    let combo: Item;

    beforeEach(() => {
        combo = new Item(
            {
                productId: '123',
                item: makeCombo({ price: makePrice({ value: 30 }) }),
                type: 'combo',
                description: 'Item description',

                quantity: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            'item-123',
        );

        product = new Item(
            {
                productId: '123',
                item: makeProduct({ price: makePrice({ value: 30 }) }),
                type: 'product',
                description: 'Item description',

                quantity: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            'item-123',
        );
    });

    it('should have the correct id', () => {
        expect(product.id).toBe('item-123');
        expect(combo.id).toBe('item-123');
    });

    it('should have the correct productId', () => {
        expect(product.productId).toBe('123');
        expect(combo.productId).toBe('123');
    });

    it('should have the correct item', () => {
        expect(product.item).toBeInstanceOf(Product);
        expect(combo.item).toBeInstanceOf(Combo);
    });

    it('should have the correct type', () => {
        console.log(product.type, combo.type);
        expect(product.type).toEqual('product');
        expect(combo.type).toEqual('combo');
    });

    it('should have the correct description', () => {
        expect(product.description).toBe('Item description');
        expect(combo.description).toBe('Item description');
    });

    it('should have the correct price', () => {
        expect(product.item.price?.value).toEqual(30);
        expect(combo.item.price?.value).toEqual(30);
    });

    it('should have the correct quantity', () => {
        expect(product.quantity).toBe(2);
        expect(combo.quantity).toBe(2);
    });

    it('should have the correct total', () => {
        expect(product.total).toBe(60);
        expect(combo.total).toBe(60);
    });

    it('should update the item properties correctly', () => {
        const newProps = {
            description: 'Updated description',
            quantity: 3,
        };
        product.update(newProps);
        expect(product.description).toBe('Updated description');
        expect(product.quantity).toBe(3);
        expect(product.updatedAt).toBeInstanceOf(Date);
    });
});
