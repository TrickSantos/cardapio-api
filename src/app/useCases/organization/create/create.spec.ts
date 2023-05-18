import { describe, it, expect } from 'vitest';
import { OrganizationInMemoryRepository } from '@infra/database/inMemory/organization.repository';
import { makeOrganization } from '@test/factories/organization.factory';
import { CreateOrganizationUseCase } from '.';

describe('Create Organization', () => {
    it('should create an organization', async () => {
        const organization = makeOrganization();
        const repository = new OrganizationInMemoryRepository();
        const useCase = new CreateOrganizationUseCase(repository);
        await useCase.execute(organization);
        const orgs = await repository.findAll();
        expect(orgs).toHaveLength(1);
        expect(orgs[0].name).toEqual(organization.name);
        expect(orgs[0].logo).toEqual(organization.logo);
    });
});
