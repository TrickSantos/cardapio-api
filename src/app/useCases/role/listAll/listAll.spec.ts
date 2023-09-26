import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { InMemoryRoleRepository } from '@infra/database/inMemory/role.repository';
import { makeRole } from '@test/factories/role.factory';
import { Role } from '@domain/entities/user/role/role';
import { ListAllRolesUseCase } from '.';

describe('List All Roles', () => {
    let role: Role;
    const repository = new InMemoryRoleRepository();
    const useCase = new ListAllRolesUseCase(repository);

    beforeEach(() => {
        Array.from({ length: 10 }).forEach(() => {
            role = makeRole();
            repository.create(role);
        });
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all roles', async () => {
        const response = await useCase.execute();
        expect(response).toHaveLength(10);
    });
});
