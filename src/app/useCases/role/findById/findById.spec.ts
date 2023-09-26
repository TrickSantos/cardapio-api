import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { RoleNotFound } from '@useCases/errors/RoleNotFound';
import { FindRoleByIdUseCase } from '.';
import { Role } from '@domain/entities/user/role/role';
import { InMemoryRoleRepository } from '@infra/database/inMemory/role.repository';
import { makeRole } from '@test/factories/role.factory';

describe('FindById', () => {
    let role: Role;
    const repository = new InMemoryRoleRepository();
    const useCase = new FindRoleByIdUseCase(repository);

    beforeEach(() => {
        role = makeRole();
        repository.create(role);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should find a role by id', async () => {
        const response = await useCase.execute(role.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(role.id);
        expect(response.name).toEqual(role.name);
    });

    it('should throw an error if role not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            RoleNotFound,
        );
    });
});
