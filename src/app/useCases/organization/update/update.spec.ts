import { describe, beforeEach, it, expect } from 'vitest';
import { Organization } from '@domain/entities/organization/organization';
import { OrganizationInMemoryRepository } from '@infra/database/inMemory/organization.repository';
import { makeOrganization } from '@test/factories/organization.factory';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';
import { UpdateOrganizationUseCase } from '.';

describe('Update Organization', () => {
    let organization: Organization;
    const repository = new OrganizationInMemoryRepository();
    const useCase = new UpdateOrganizationUseCase(repository);

    beforeEach(() => {
        organization = makeOrganization();
        repository.create(organization);
    });

    it('should update an organization', async () => {
        await useCase.execute({
            id: organization.id,
            name: 'new name',
            logo: 'new logo',
            isActive: false,
        });
        const updatedOrg = await repository.findById(organization.id);
        expect(updatedOrg).toBeDefined();
        expect(updatedOrg?.id).toEqual(organization.id);
        expect(updatedOrg?.name).toEqual('new name');
        expect(updatedOrg?.logo).toEqual('new logo');
        expect(updatedOrg?.isActive).toEqual(false);
    });

    it('should throw an error if organization not found', async () => {
        await expect(
            useCase.execute({
                id: 'invalid-id',
                name: 'new name',
                logo: 'new logo',
                isActive: false,
            }),
        ).rejects.toThrow(OrganizationNotFound);
    });
});
