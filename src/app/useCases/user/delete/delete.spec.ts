import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { UserNotFound } from '@useCases/errors/UserNotFound';
import { DeleteUserUseCase } from '.';

describe('Delete User', () => {
    it('should delete a user', async () => {
        const user = makeUser();
        const repository = new InMemoryUserRepository();
        const useCase = new DeleteUserUseCase(repository);
        await repository.create(user);
        await useCase.execute(user.id);
        const users = await repository.findAll();
        expect(users).toHaveLength(0);
    });

    it('should throw an error if user not found', async () => {
        const repository = new InMemoryUserRepository();
        const useCase = new DeleteUserUseCase(repository);
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            UserNotFound,
        );
    });
});
