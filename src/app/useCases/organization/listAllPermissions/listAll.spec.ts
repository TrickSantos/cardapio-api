import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { Organization } from '@domain/entities/organization/organization';
import { InMemoryOrganizationRepository } from '@infra/database/inMemory/organization.repository';
import { makeOrganization } from '@test/factories/organization.factory';
import { ListAllOrganizationPermissionsUseCase } from '.';
import { makePermission } from '@test/factories/permission.factory';

describe('List All Permissions from a organization', () => {
    let organization: Organization;
    const repository = new InMemoryOrganizationRepository();
    const useCase = new ListAllOrganizationPermissionsUseCase(repository);

    beforeEach(() => {
        organization = makeOrganization();
        repository.create(organization);
        repository.permissions = {
            organizationId: organization.id,
            permissions: Array.from({ length: 10 }, () => makePermission()),
        };
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all permissions from a organizations', async () => {
        const response = await useCase.execute(organization.id);
        expect(response).toHaveLength(10);
    });

    it('should return empty array if organization does not have permissions', async () => {
        repository.permissions = {
            organizationId: organization.id,
            permissions: [],
        };
        const response = await useCase.execute(organization.id);
        expect(response).toHaveLength(0);
    });
});
