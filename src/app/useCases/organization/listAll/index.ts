import { Organization } from '@domain/entities/organization/organization';
import { OrganizationRepository } from '@domain/repositories/organization.repository';

export class ListAllOrganizations {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(): Promise<Organization[]> {
        return this.organizationRepository.findAll();
    }
}
