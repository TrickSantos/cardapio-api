import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { Role } from '@domain/entities/user/role/role';
import { InMemoryRoleRepository } from '@infra/database/inMemory/role.repository';
import { makeRole } from '@test/factories/role.factory';
import { RoleNotFound } from '@useCases/errors/RoleNotFound';
import { UpdateRoleUseCase } from '.';
import { InMemoryPermissionRepository } from '@infra/database/inMemory/permission.repository';
import { Permission } from '@domain/entities/user/permission/permission';
import { makePermission } from '@test/factories/permission.factory';

describe('Update Role', () => {
    let role: Role;
    let permissions: Permission[];
    const roleRepository = new InMemoryRoleRepository();
    const permissionRepository = new InMemoryPermissionRepository();
    const useCase = new UpdateRoleUseCase(roleRepository, permissionRepository);

    beforeEach(async () => {
        role = makeRole();
        permissions = Array.from({ length: 3 }, () => makePermission());
        await Promise.all(
            permissions.map((permission) =>
                permissionRepository.create(permission),
            ),
        );
        roleRepository.create(role);
    });

    afterEach(() => {
        roleRepository.reset();
        permissionRepository.reset();
    });

    it('should update a user', async () => {
        const updatedRole = makeRole();
        await useCase.execute({
            id: role.id,
            name: updatedRole.name,
            description: updatedRole.description,
            isActive: updatedRole.isActive,
        });

        const found = await roleRepository.findById(role.id);
        expect(found?.description).toBe(updatedRole.description);
        expect(found?.name).toBe(updatedRole.name);
        expect(found?.isActive).toBe(updatedRole.isActive);
    });

    it('should throw an error if role not found', async () => {
        await expect(
            useCase.execute({ ...makeRole(), id: 'invalid-id' }),
        ).rejects.toThrow(RoleNotFound);
    });
});
