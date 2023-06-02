import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { Organization } from '@domain/entities/organization/organization';
import { InMemoryOrganizationRepository } from '@infra/database/inMemory/organization.repository';
import { makeOrganization } from '@test/factories/organization.factory';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';
import { FindOrganizationByIdUseCase } from '.';

describe('FindUnique', () => {
    let organization: Organization;
    const repository = new InMemoryOrganizationRepository();
    const findUnique = new FindOrganizationByIdUseCase(repository);

    beforeEach(() => {
        organization = makeOrganization();
        repository.create(organization);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should find an organization by id', async () => {
        const response = await findUnique.execute(organization.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(organization.id);
        expect(response.name).toEqual(organization.name);
        expect(response.logo).toEqual(organization.logo);
    });

    it('should throw an error if organization not found', async () => {
        await expect(findUnique.execute('invalid-id')).rejects.toThrow(
            OrganizationNotFound,
        );
    });
});
