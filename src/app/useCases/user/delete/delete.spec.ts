import { describe, it, expect } from 'vitest';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { UserNotFound } from '@useCases/errors/UserNotFound';
import { DeleteUserUseCase } from '.';
import { User } from '@domain/entities/user/user';

describe('Delete User', () => {
    let user: User;
    const repository = new InMemoryUserRepository();
    const useCase = new DeleteUserUseCase(repository);

    beforeAll(async () => {
        user = await makeUser();
    });

    it('should delete a user', async () => {
        await repository.create(user);
        await useCase.execute(user.id);
        const users = await repository.findAll();
        expect(users).toHaveLength(0);
    });

    it('should throw an error if user not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            UserNotFound,
        );
    });
});
