import { describe, it, expect } from 'vitest';
import { InMemoryOrganizationRepository } from '@infra/database/inMemory/organization.repository';
import { CreateOrganizationRoleUseCase } from '.';
import { InMemoryPermissionRepository } from '@infra/database/inMemory/permission.repository';
import { makeOrganizationRole } from '@test/factories/organizationRole.factory';
import { makeOrganization } from '@test/factories/organization.factory';

describe('Create Role for a Organization', () => {
    it('should create an role', async () => {
        const organization = makeOrganization();
        const role = makeOrganizationRole({ organizationId: organization.id });
        const repository = new InMemoryOrganizationRepository();
        const permissionRepository = new InMemoryPermissionRepository();
        const useCase = new CreateOrganizationRoleUseCase(
            repository,
            permissionRepository,
        );

        repository.organizations = [organization];

        await useCase.execute({
            description: role.description,
            name: role.name,
            organizationId: role.organizationId,
            permissions: role.permissions.map((permission) => permission.id),
        });

        const orgs = await repository.findRoles(role.organizationId);
        expect(orgs).toHaveLength(1);
        expect(orgs[0].name).toEqual(role.name);
        expect(orgs[0].description).toEqual(role.description);
        repository.reset();
    });
});
