import { Permission } from '@domain/entities/user/permission/permission';
import { InMemoryPermissionRepository } from '@infra/database/inMemory/permission.repository';
import { describe, afterEach, it, expect } from 'vitest';
import { CreatePermissionUseCase } from '.';
import { makePermission } from '@test/factories/permission.factory';

describe('Create Permission', () => {
    let role: Permission;
    const repository = new InMemoryPermissionRepository();
    const useCase = new CreatePermissionUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a role', async () => {
        role = makePermission();
        await useCase.execute({
            name: role.name,
            description: role.description,
        });
        const roles = await repository.findAll();
        expect(roles.length).toBe(1);
    });
});
