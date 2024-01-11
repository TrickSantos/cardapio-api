import { Order } from './order';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Order', () => {
    let order: Order;

    beforeEach(async () => {
        order = new Order({
            placeId: 'place-123',
            orderNumber: 1,
            tableId: 'table-123',
            items: [],
            customerId: 'customer-123',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });

    it('should create an instance of Order', () => {
        expect(order).toBeInstanceOf(Order);
    });

    it('should have the correct properties', () => {
        expect(order.id).toBeDefined();
        expect(order.placeId).toBe('place-123');
        expect(order.orderNumber).toBe(1);
        expect(order.status).toBe('pending');
        expect(order.tableId).toBe('table-123');
        expect(order.items).toEqual([]);
        expect(order.customerId).toBe('customer-123');
        expect(order.isActive).toBe(true);
        expect(order.createdAt).toBeInstanceOf(Date);
        expect(order.updatedAt).toBeInstanceOf(Date);
    });

    it('should update the order properties', () => {
        order.update({ status: 'completed' });

        expect(order.status).toBe('completed');
        expect(order.updatedAt).toBeInstanceOf(Date);
    });

    it('should convert the order to JSON', () => {
        const json = order.toJSON();

        expect(json.id).toBe(order.id);
        expect(json.placeId).toBe(order.placeId);
        expect(json.orderNumber).toBe(order.orderNumber);
        expect(json.status).toBe(order.status);
        expect(json.tableId).toBe(order.tableId);
        expect(json.items).toEqual(order.items);
        expect(json.customerId).toBe(order.customerId);
        expect(json.isActive).toBe(order.isActive);
        expect(json.createdAt).toBe(order.createdAt);
        expect(json.updatedAt).toBe(order.updatedAt);
    });
});
