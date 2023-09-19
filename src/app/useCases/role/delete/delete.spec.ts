import { Role } from '@domain/entities/user/role/role';
import { InMemoryRoleRepository } from '@infra/database/inMemory/role.repository';
import { describe, it, expect } from 'vitest';
import { DeleteRoleUseCase } from '.';
import { makeRole } from '@test/factories/role.factory';
import { RoleNotFound } from '@useCases/errors/RoleNotFound';

describe('Delete Role', () => {
    let role: Role;
    const repository = new InMemoryRoleRepository();
    const useCase = new DeleteRoleUseCase(repository);

    beforeEach(() => {
        role = makeRole();
        repository.create(role);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should delete a role', async () => {
        await useCase.execute(role.id);
        const users = await repository.findAll();
        expect(users).toHaveLength(0);
    });

    it('should throw an error if user not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            RoleNotFound,
        );
    });
});
