import { describe, afterAll, beforeAll, it, expect } from 'vitest';
import { User } from '@domain/entities/user/user';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { UserNotFound } from '@useCases/errors/UserNotFound';
import { FindUserByIdUseCase } from '.';

describe('FindById', () => {
    let user: User;
    const repository = new InMemoryUserRepository();
    const useCase = new FindUserByIdUseCase(repository);

    beforeAll(async () => {
        user = await makeUser();
        repository.create(user);
    });

    afterAll(() => {
        repository.reset();
    });

    it('should find a user by id', async () => {
        const response = await useCase.execute(user.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(user.id);
    });

    it('should throw an error if user not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            UserNotFound,
        );
    });
});
