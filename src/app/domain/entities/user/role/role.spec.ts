import { describe, it, expect } from 'vitest';
import { Role } from './role';

describe('Role', () => {
    it('should create a role', () => {
        const role = new Role({
            name: 'name',
        });

        expect(role).toBeDefined();
        expect(role.id).toBeDefined();
    });

    it('should update a role', () => {
        const role = new Role({
            name: 'name',
        });

        role.update({
            name: 'new-name',
        });

        expect(role.name).toBe('new-name');
    });
});
