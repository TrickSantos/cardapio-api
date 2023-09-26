import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { FindPermissionByIdUseCase } from '.';
import { Permission } from '@domain/entities/user/permission/permission';
import { InMemoryPermissionRepository } from '@infra/database/inMemory/permission.repository';
import { makePermission } from '@test/factories/permission.factory';
import { PermissionNotFound } from '@useCases/errors/PermissionNotFound';

describe('FindById', () => {
    let permission: Permission;
    const repository = new InMemoryPermissionRepository();
    const useCase = new FindPermissionByIdUseCase(repository);

    beforeEach(() => {
        permission = makePermission();
        repository.create(permission);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should find a permission by id', async () => {
        const response = await useCase.execute(permission.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(permission.id);
        expect(response.name).toEqual(permission.name);
    });

    it('should throw an error if permission not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            PermissionNotFound,
        );
    });
});
