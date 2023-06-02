import { describe, it, expect } from 'vitest';
import { Menu } from './menu';

describe('Menu', () => {
    it('should create a valid menu', () => {
        const menu = new Menu({
            placeId: 'placeId',
            name: 'name',
            description: 'description',
            isActive: true,
        });

        expect(menu).toBeInstanceOf(Menu);
        expect(menu.id).toBeDefined();
        expect(menu.placeId).toBe('placeId');
        expect(menu.name).toBe('name');
        expect(menu.description).toBe('description');
        expect(menu.isActive).toBe(true);
        expect(menu.createdAt).toBeInstanceOf(Date);
        expect(menu.updatedAt).toBeInstanceOf(Date);
    });

    it('should return the primitive values', () => {
        const menu = new Menu({
            placeId: 'placeId',
            name: 'name',
            description: 'description',
            isActive: true,
        });

        const primitives = menu.toJSON();

        expect(primitives).toBeDefined();
        expect(primitives.placeId).toBe('placeId');
        expect(primitives.name).toBe('name');
        expect(primitives.description).toBe('description');
        expect(primitives.isActive).toBe(true);
    });
});
