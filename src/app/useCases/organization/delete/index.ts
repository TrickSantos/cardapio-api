import { OrganizationRepository } from '@domain/repositories/organization.repository';

export class DeleteOrganization {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(id: string): Promise<void> {
        const organization = await this.organizationRepository.findById(id);
        if (organization) {
            return this.organizationRepository.delete(organization);
        } else {
            throw new Error('Organization not found');
        }
    }
}
