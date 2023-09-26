import { describe, it, expect } from 'vitest';
import { User } from './user';
import { makeRole } from '@test/factories/role.factory';
import { makePermission } from '@test/factories/permission.factory';

describe('User', () => {
    it('should create a user', () => {
        const user = new User({
            organizationId: 'org-id',
            email: 'email',
            username: 'username',
            isActive: true,
            password: 'password',
        });

        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.organizationId).toBe('org-id');
        expect(user.email).toBe('email');
        expect(user.username).toBe('username');
        expect(user.isActive).toBe(true);
        expect(user.password).toBe('password');
        expect(user.createdAt).toBeDefined();
        expect(user.updatedAt).toBeDefined();
    });

    it('should create a user with roles', () => {
        const role = makeRole();
        const user = new User({
            organizationId: 'org-id',
            email: 'email',
            username: 'username',
            isActive: true,
            password: 'password',
            roles: [role],
        });

        expect(user.roles.length).toBe(1);
    });

    it('should create a user with permissions', () => {
        const permission = makePermission();
        const user = new User({
            organizationId: 'org-id',
            email: 'email',
            username: 'username',
            isActive: true,
            password: 'password',
            permissions: [permission],
        });

        expect(user.permissions.length).toBe(1);
    });

    it('should update a user', () => {
        const user = new User({
            organizationId: 'org-id',
            email: 'email',
            username: 'username',
            isActive: true,
            password: 'password',
        });

        user.update({
            username: 'new-username',
        });

        expect(user.username).toBe('new-username');
    });

    it('should add a role to a user', () => {
        const role = makeRole();
        const user = new User({
            organizationId: 'org-id',
            email: 'email',
            username: 'username',
            isActive: true,
            password: 'password',
        });

        user.addRole(role);

        expect(user.roles.length).toBe(1);
    });

    it('should remove a role from a user', () => {
        const role = makeRole();
        const user = new User({
            organizationId: 'org-id',
            email: 'email',
            username: 'username',
            isActive: true,
            password: 'password',
            roles: [role],
        });

        expect(user.roles.length).toBe(1);

        user.removeRole(role);

        expect(user.roles.length).toBe(0);
    });

    it('should add a permission to a user', () => {
        const permission = makePermission();
        const user = new User({
            organizationId: 'org-id',
            email: 'email',
            username: 'username',
            isActive: true,
            password: 'password',
        });

        user.addPermission(permission);

        expect(user.permissions.length).toBe(1);
    });

    it('should remove a permission from a user', () => {
        const permission = makePermission();
        const user = new User({
            organizationId: 'org-id',
            email: 'email',
            username: 'username',
            isActive: true,
            password: 'password',
            permissions: [permission],
        });

        expect(user.permissions.length).toBe(1);

        user.removePermission(permission);

        expect(user.permissions.length).toBe(0);
    });
});
