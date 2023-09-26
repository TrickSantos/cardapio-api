import { describe, it, expect } from 'vitest';
import { DeletePermissionUseCase } from '.';
import { Permission } from '@domain/entities/user/permission/permission';
import { InMemoryPermissionRepository } from '@infra/database/inMemory/permission.repository';
import { makePermission } from '@test/factories/permission.factory';
import { PermissionNotFound } from '@useCases/errors/PermissionNotFound';

describe('Delete Permission', () => {
    let permission: Permission;
    const repository = new InMemoryPermissionRepository();
    const useCase = new DeletePermissionUseCase(repository);

    beforeEach(() => {
        permission = makePermission();
        repository.create(permission);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should delete a permission', async () => {
        await useCase.execute(permission.id);
        const users = await repository.findAll();
        expect(users).toHaveLength(0);
    });

    it('should throw an error if user not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            PermissionNotFound,
        );
    });
});
