import { OrganizationRepository } from '@domain/repositories/organization.repository';

type UpdateOrganizationDTO = {
    id: string;
    name?: string;
    logo?: string;
    isActive?: boolean;
};

export class UpdateOrganization {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(org: UpdateOrganizationDTO): Promise<void> {
        const organization = await this.organizationRepository.findById(org.id);
        if (organization) {
            organization.update({
                ...org,
            });
            return this.organizationRepository.update(organization);
        } else {
            throw new Error('Organization not found');
        }
    }
}
