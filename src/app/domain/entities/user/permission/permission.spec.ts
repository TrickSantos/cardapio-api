import { describe, it, expect } from 'vitest';
import { Permission } from './permission';

describe('Permission', () => {
    it('should create a permission', () => {
        const permission = new Permission({
            name: 'name',
            description: 'description',
            isActive: true,
        });

        expect(permission).toBeDefined();
        expect(permission.id).toBeDefined();
    });

    it('should update a permission', () => {
        const permission = new Permission({
            name: 'name',
            description: 'description',
            isActive: true,
        });

        permission.update({
            name: 'new-name',
        });

        expect(permission.name).toBe('new-name');
    });
});
