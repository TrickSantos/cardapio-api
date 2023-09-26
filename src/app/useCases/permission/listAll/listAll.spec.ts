import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { ListAllPermissionsUseCase } from '.';
import { Permission } from '@domain/entities/user/permission/permission';
import { InMemoryPermissionRepository } from '@infra/database/inMemory/permission.repository';
import { makePermission } from '@test/factories/permission.factory';

describe('List All Permissions', () => {
    let permission: Permission;
    const repository = new InMemoryPermissionRepository();
    const useCase = new ListAllPermissionsUseCase(repository);

    beforeEach(() => {
        Array.from({ length: 10 }).forEach(() => {
            permission = makePermission();
            repository.create(permission);
        });
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all permissions', async () => {
        const response = await useCase.execute();
        expect(response).toHaveLength(10);
    });
});
