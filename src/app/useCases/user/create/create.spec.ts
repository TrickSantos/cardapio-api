import { describe, afterEach, it, expect } from 'vitest';
import { User } from '@domain/entities/user/user';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { CreateUserUseCase } from '.';
import { makeContact } from '@test/factories/contact.factory';

describe('Create User', () => {
    let user: User;
    const repository = new InMemoryUserRepository();
    const useCase = new CreateUserUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a user', async () => {
        user = makeUser();
        const contact = makeContact({
            userId: user.id,
        });
        user.update({
            contact,
        });
        await useCase.execute({
            contact: {
                email: contact.email,
                phone: contact.phone,
                firstName: contact.firstName,
                lastName: contact.lastName,
            },
            username: user.username,
            email: user.email,
            password: user.password,
            isActive: user.isActive,
            organizationId: user.organizationId,
        });
        const users = await repository.findAll();
        expect(users).toHaveLength(1);
        expect(users[0].username).toEqual(user.username);
        expect(users[0].email).toEqual(user.email);
    });
});
