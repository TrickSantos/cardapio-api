import { User } from '@domain/entities/user/user';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { CreateUser } from '.';

describe('Create User', () => {
    let user: User;
    const repository = new InMemoryUserRepository();
    const useCase = new CreateUser(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a user', async () => {
        user = makeUser();
        await useCase.execute(user);
        const users = await repository.findAll();
        expect(users).toHaveLength(1);
        expect(users[0].username).toEqual(user.username);
        expect(users[0].email).toEqual(user.email);
    });
});
