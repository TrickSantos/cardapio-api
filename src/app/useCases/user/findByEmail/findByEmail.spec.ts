import { describe, afterAll, beforeAll, it, expect } from 'vitest';
import { User } from '@domain/entities/user/user';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { UserNotFound } from '@useCases/errors/UserNotFound';
import { FindUserByEmailUseCase } from '.';

describe('FindByEmail', () => {
    let user: User;
    const repository = new InMemoryUserRepository();
    const useCase = new FindUserByEmailUseCase(repository);

    beforeAll(async () => {
        user = await makeUser();
        repository.create(user);
    });

    afterAll(() => {
        repository.reset();
    });

    it('should find a user by email', async () => {
        const response = await useCase.execute(user.email);
        expect(response).toBeDefined();
        expect(response.email).toEqual(user.email);
    });

    it('should throw an error if user not found', async () => {
        await expect(useCase.execute('invalid-email')).rejects.toThrow(
            UserNotFound,
        );
    });
});
