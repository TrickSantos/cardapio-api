import { describe, afterAll, it, expect } from 'vitest';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { makeUser } from '@test/factories/user.factory';
import { CreateUserUseCase } from '.';
import { makeContact } from '@test/factories/contact.factory';
import { InMemoryOrganizationRepository } from '@infra/database/inMemory/organization.repository';

describe('Create User', async () => {
    const repository = new InMemoryUserRepository();
    const orgRepository = new InMemoryOrganizationRepository();
    const useCase = new CreateUserUseCase(repository, orgRepository);

    const user = await makeUser();
    const contact = makeContact({
        userId: user.id,
    });
    user.update({
        contact,
    });

    afterAll(() => {
        repository.reset();
    });

    it('should create a user', async () => {
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
            roles: [],
        });
        const response = await repository.findById(user.id);
        expect(response).toBeDefined();
    });
});
