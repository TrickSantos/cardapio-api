import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { UpdatePermissionUseCase } from '.';
import { Permission } from '@domain/entities/user/permission/permission';
import { InMemoryPermissionRepository } from '@infra/database/inMemory/permission.repository';
import { makePermission } from '@test/factories/permission.factory';
import { PermissionNotFound } from '@useCases/errors/PermissionNotFound';

describe('Update Permission', () => {
    let permission: Permission;
    const repository = new InMemoryPermissionRepository();
    const useCase = new UpdatePermissionUseCase(repository);

    beforeEach(() => {
        permission = makePermission();
        repository.create(permission);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should update a user', async () => {
        const updatedPermission = makePermission();
        await useCase.execute({
            id: permission.id,
            name: updatedPermission.name,
            description: updatedPermission.description,
            isActive: updatedPermission.isActive,
        });

        const found = await repository.findById(permission.id);
        expect(found).toBeDefined();
        expect(found?.id).toBe(permission.id);
        expect(found?.name).toBe(updatedPermission.name);
        expect(found?.description).toBe(updatedPermission.description);
        expect(found?.isActive).toBe(updatedPermission.isActive);
    });

    it('should throw an error if permission not found', async () => {
        await expect(
            useCase.execute({ ...makePermission(), id: 'invalid-id' }),
        ).rejects.toThrow(PermissionNotFound);
    });
});
