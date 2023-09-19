import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { Role } from '@domain/entities/user/role/role';
import { InMemoryRoleRepository } from '@infra/database/inMemory/role.repository';
import { makeRole } from '@test/factories/role.factory';
import { RoleNotFound } from '@useCases/errors/RoleNotFound';
import { UpdateRoleUseCase } from '.';

describe('Update Role', () => {
    let role: Role;
    const repository = new InMemoryRoleRepository();
    const useCase = new UpdateRoleUseCase(repository);

    beforeEach(() => {
        role = makeRole();
        repository.create(role);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should update a user', async () => {
        const updatedRole = makeRole();
        await useCase.execute({
            id: role.id,
            name: updatedRole.name,
            description: updatedRole.description,
        });

        const found = await repository.findById(role.id);
        expect(found?.description).toBe(updatedRole.description);
        expect(found?.name).toBe(updatedRole.name);
    });

    it('should throw an error if role not found', async () => {
        await expect(
            useCase.execute({ ...makeRole(), id: 'invalid-id' }),
        ).rejects.toThrow(RoleNotFound);
    });
});
