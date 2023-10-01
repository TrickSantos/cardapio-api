import { InMemoryOrganizationRepository } from '@infra/database/inMemory/organization.repository';
import { makeOrganizationRole } from '@test/factories/organizationRole.factory';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { FindAllOrganizationRolesUseCase } from '.';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';
import { Organization } from '@domain/entities/organization/organization';
import { makeOrganization } from '@test/factories/organization.factory';

describe('findAllRoles', () => {
    let organization: Organization;
    const repository = new InMemoryOrganizationRepository();
    const useCase = new FindAllOrganizationRolesUseCase(repository);

    beforeEach(async () => {
        organization = makeOrganization();
        await repository.create(organization);
        await Promise.all(
            Array.from({ length: 10 }).map(() =>
                repository.createRole(
                    makeOrganizationRole({
                        organizationId: organization.id,
                    }),
                ),
            ),
        );
    });

    afterEach(() => {
        repository.reset();
    });

    it('should return all roles', async () => {
        const roles = await useCase.execute(organization.id);

        expect(roles.length).toBe(10);
    });

    it('should throw a exception if organizationId dont exists', async () => {
        expect(useCase.execute('organizationId2')).rejects.toThrow(
            OrganizationNotFound,
        );
    });
});
