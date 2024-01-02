import { Role } from '@domain/entities/user/role/role';
import { User } from '@domain/entities/user/user';
import { InMemoryRoleRepository } from '@infra/database/inMemory/role.repository';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { AddUsersToRoleUseCase } from '.';
import { makeRole } from '@test/factories/role.factory';
import { makeUser } from '@test/factories/user.factory';

describe('addUsers', () => {
    let role: Role;
    let users: User[];

    const roleRepository = new InMemoryRoleRepository();
    const userRepository = new InMemoryUserRepository();
    const useCase = new AddUsersToRoleUseCase(roleRepository, userRepository);

    beforeAll(async () => {
        role = makeRole();
        users = await Promise.all(
            Array.from({ length: 3 }, async () => await makeUser()),
        );

        await Promise.all(users.map((user) => userRepository.create(user)));

        await roleRepository.create(role);

        roleRepository.users = users;
    });

    afterAll(() => {
        roleRepository.reset();
        userRepository.reset();
    });

    it('should add users to a role', async () => {
        await useCase.execute({
            roleId: role.id,
            users: users.map((user) => user.id),
        });

        const roleFound = await roleRepository.findById(role.id);

        expect(roleFound).toBeDefined();
        expect(roleFound?.users.length).toBe(users.length);
    });

    it('should not add users to a role if the role does not exist', async () => {
        await expect(
            useCase.execute({
                roleId: 'non-existent-role-id',
                users: users.map((user) => user.id),
            }),
        ).rejects.toThrow('Role not found');
    });

    it('should not add users to a role if the user does not exist', async () => {
        await expect(
            useCase.execute({
                roleId: role.id,
                users: ['non-existent-user-id'],
            }),
        ).rejects.toThrow('User not found');
    });
});
