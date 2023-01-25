import { Organization } from '@domain/entities/organization/organization';
import { OrganizationInMemoryRepository } from '@infra/database/inMemory/organization.repository';
import { makeOrganization } from '@test/factories/organization.factory';
import { ListAllOrganizations } from '.';

describe('List All Organizations', () => {
    let organization: Organization;
    const repository = new OrganizationInMemoryRepository();
    const useCase = new ListAllOrganizations(repository);

    beforeEach(() => {
        Array.from({ length: 10 }).forEach(() => {
            organization = makeOrganization();
            repository.create(organization);
        });
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all organizations', async () => {
        const response = await useCase.execute();
        expect(response).toHaveLength(10);
    });
});
