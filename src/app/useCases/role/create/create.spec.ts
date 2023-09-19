import { describe, afterEach, it, expect } from 'vitest';
import { CreateRoleUseCase } from '.';
import { Role } from '@domain/entities/user/role/role';
import { InMemoryRoleRepository } from '@infra/database/inMemory/role.repository';
import { makeRole } from '@test/factories/role.factory';

describe('Create Role', () => {
    let role: Role;
    const repository = new InMemoryRoleRepository();
    const useCase = new CreateRoleUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a role', async () => {
        role = makeRole();
        await useCase.execute({
            name: role.name,
            description: role.description,
        });
        const roles = await repository.findAll();
        expect(roles.length).toBe(1);
    });
});
