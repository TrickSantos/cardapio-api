import { describe, it, expect } from 'vitest';
import { Role } from './role';
import { makeUser } from '@test/factories/user.factory';
import { makePermission } from '@test/factories/permission.factory';

describe('Role', () => {
    it('should create a role', () => {
        const role = new Role({
            name: 'name',
            description: 'description',
        });

        expect(role).toBeDefined();
        expect(role.id).toBeDefined();
        expect(role.name).toBe('name');
        expect(role.description).toBe('description');
        expect(role.isActive).toBe(true);
        expect(role.permissions).toHaveLength(0);
        expect(role.users).toHaveLength(0);
        expect(role.createdAt).toBeInstanceOf(Date);
        expect(role.updatedAt).toBeInstanceOf(Date);
    });

    it('should create a role with permission', () => {
        const role = new Role({
            name: 'name',
            description: 'description',
            permissions: [makePermission()],
        });

        expect(role).toBeDefined();
        expect(role.id).toBeDefined();
        expect(role.permissions).toHaveLength(1);
    });

    it('should create a role with user', async () => {
        const user = await makeUser();
        const role = new Role({
            name: 'name',
            description: 'description',
            users: [user],
        });

        expect(role).toBeDefined();
        expect(role.id).toBeDefined();
        expect(role.users).toHaveLength(1);
    });

    it('should update a role', () => {
        const role = new Role({
            name: 'name',
            description: 'description',
        });

        role.update({
            name: 'new-name',
        });

        expect(role.name).toBe('new-name');
    });

    it('should add a permission', () => {
        const role = new Role({
            name: 'name',
            description: 'description',
        });

        role.addPermission(makePermission());

        expect(role.permissions).toHaveLength(1);
    });

    it('should remove a permission', () => {
        const permission = makePermission();

        const role = new Role({
            name: 'name',
            description: 'description',
            permissions: [permission],
        });

        role.removePermission(permission);

        expect(role.permissions).toHaveLength(0);
    });

    it('should update a user permission', () => {
        const permissions = Array.from({ length: 10 }, () => makePermission());

        const role = new Role({
            name: 'name',
            description: 'description',
        });

        role.update({
            permissions,
        });

        expect(role.permissions).toHaveLength(10);
    });
});
