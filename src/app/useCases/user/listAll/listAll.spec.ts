import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { User } from '@domain/entities/user/user';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { ListAllUsersUseCase } from '.';

describe('List All Users', () => {
    let user: User;
    const repository = new InMemoryUserRepository();
    const useCase = new ListAllUsersUseCase(repository);

    beforeEach(() => {
        Array.from({ length: 10 }).forEach(() => {
            user = makeUser();
            repository.create(user);
        });
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all users', async () => {
        const response = await useCase.execute();
        expect(response).toHaveLength(10);
    });
});
