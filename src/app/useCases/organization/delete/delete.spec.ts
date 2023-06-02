import { describe, it, expect } from 'vitest';
import { InMemoryOrganizationRepository } from '@infra/database/inMemory/organization.repository';
import { makeOrganization } from '@test/factories/organization.factory';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';
import { DeleteOrganizationUseCase } from '.';

describe('Delete Organization', () => {
    it('should delete an organization', async () => {
        const organization = makeOrganization();
        const repository = new InMemoryOrganizationRepository();
        const useCase = new DeleteOrganizationUseCase(repository);
        await repository.create(organization);
        await useCase.execute(organization.id);
        const orgs = await repository.findAll();
        expect(orgs).toHaveLength(0);
    });

    it('should throw an error if organization not found', async () => {
        const repository = new InMemoryOrganizationRepository();
        const useCase = new DeleteOrganizationUseCase(repository);
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            OrganizationNotFound,
        );
    });
});
