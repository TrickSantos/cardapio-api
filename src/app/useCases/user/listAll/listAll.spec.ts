import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { User } from '@domain/entities/user/user';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { ListAllUsersUseCase } from '.';

describe('List All Users', () => {
    let user: User;
    const repository = new InMemoryUserRepository();
    const useCase = new ListAllUsersUseCase(repository);

    beforeAll(async () => {
        for (let index = 0; index < 10; index++) {
            user = await makeUser();
            repository.create(user);
        }
    });

    afterAll(() => {
        repository.reset();
    });

    it('should list all users', async () => {
        const users = await useCase.execute();

        expect(users).toHaveLength(10);
    });

    it('should list all users with pagination', async () => {
        const users = await useCase.execute({ limit: 5, offset: 5 });

        expect(users).toHaveLength(5);
    });
});
