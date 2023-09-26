import { describe, afterEach, it, expect } from 'vitest';
import { CreateRoleUseCase } from '.';
import { Role } from '@domain/entities/user/role/role';
import { InMemoryRoleRepository } from '@infra/database/inMemory/role.repository';
import { makeRole } from '@test/factories/role.factory';
import { InMemoryPermissionRepository } from '@infra/database/inMemory/permission.repository';
import { makePermission } from '@test/factories/permission.factory';
import { Permission } from '@domain/entities/user/permission/permission';

describe('Create Role', () => {
    let role: Role;
    let permissions: Permission[];
    const roleRepository = new InMemoryRoleRepository();
    const permissionRepository = new InMemoryPermissionRepository();
    const useCase = new CreateRoleUseCase(roleRepository, permissionRepository);

    beforeEach(async () => {
        permissions = Array.from({ length: 3 }, () => makePermission());
        await Promise.all(
            permissions.map((permission) =>
                permissionRepository.create(permission),
            ),
        );
    });

    afterEach(() => {
        roleRepository.reset();
        permissionRepository.reset();
    });

    it('should create a role', async () => {
        role = makeRole();

        await useCase.execute({
            name: role.name,
            description: role.description,
            permissions: permissions.map((permission) => permission.id),
        });
        const roles = await roleRepository.findAll();
        expect(roles.length).toBe(1);
        expect(roles[0].permissions.length).toBe(permissions.length);
    });
});
