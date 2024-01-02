import { describe, afterAll, beforeAll, it, expect } from 'vitest';
import { User } from '@domain/entities/user/user';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { UserNotFound } from '@useCases/errors/UserNotFound';
import { UpdateUserUseCase } from '.';

describe('Update User', () => {
    let user: User;
    const repository = new InMemoryUserRepository();
    const useCase = new UpdateUserUseCase(repository);

    beforeAll(async () => {
        user = await makeUser();
        repository.create(user);
    });

    afterAll(() => {
        repository.reset();
    });

    it('should update a user', async () => {
        const updatedUser = await makeUser();
        await useCase.execute({
            id: user.id,
            username: updatedUser.username,
            email: updatedUser.email,
        });
        const users = await repository.findAll();

        expect(users[0].username).toEqual(updatedUser.username);
        expect(users[0].email).toEqual(updatedUser.email);
    });

    it('should throw an error if user not found', async () => {
        await expect(
            useCase.execute({ ...user, id: 'invalid-id' }),
        ).rejects.toThrow(UserNotFound);
    });
});
