import { makeSection } from '@test/factories/section.factory';
import { describe, it, expect } from 'vitest';

describe('Section', () => {
    it('should create an instance', () => {
        const product = makeSection();
        expect(product).toBeTruthy();
        expect(product.id).toBeDefined();
        expect(product.createdAt).toBeDefined();
    });

    it('should be able to return the primitive values', () => {
        const product = makeSection({
            name: 'test',
            menuId: 'test',
            isActive: true,
        });
        const primitives = product.toJSON();

        expect(primitives).toBeDefined();
        expect(primitives.name).toBe('test');
        expect(primitives.menuId).toBe('test');
        expect(primitives.isActive).toBe(true);
    });
});
