import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { User } from '@domain/entities/user/user';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { UserNotFound } from '@useCases/errors/UserNotFound';
import { FindUserByIdUseCase } from '.';

describe('FindById', () => {
    let user: User;
    const repository = new InMemoryUserRepository();
    const useCase = new FindUserByIdUseCase(repository);

    beforeEach(() => {
        user = makeUser();
        repository.create(user);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should find a user by id', async () => {
        const response = await useCase.execute(user.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(user.id);
        expect(response.username).toEqual(user.username);
        expect(response.email).toEqual(user.email);
    });

    it('should throw an error if user not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            UserNotFound,
        );
    });
});
