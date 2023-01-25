import { OrganizationInMemoryRepository } from '@infra/database/inMemory/organization.repository';
import { makeOrganization } from '@test/factories/organization.factory';
import { DeleteOrganization } from '.';

describe('Delete Organization', () => {
    it('should delete an organization', async () => {
        const organization = makeOrganization();
        const repository = new OrganizationInMemoryRepository();
        const useCase = new DeleteOrganization(repository);
        await repository.create(organization);
        await useCase.execute(organization.id);
        const orgs = await repository.findAll();
        expect(orgs).toHaveLength(0);
    });

    it('should throw an error if organization not found', async () => {
        const repository = new OrganizationInMemoryRepository();
        const useCase = new DeleteOrganization(repository);
        await expect(useCase.execute('invalid-id')).rejects.toThrowError(
            'Organization not found',
        );
    });
});
