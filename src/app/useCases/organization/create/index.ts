import { Organization } from '@domain/entities/organization/organization';
import { OrganizationRepository } from '@domain/repositories/organization.repository';

type CreateOrganizationDTO = {
    name: string;
    logo: string;
};

export class CreateOrganization {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(data: CreateOrganizationDTO): Promise<void> {
        const organization = new Organization({
            name: data.name,
            logo: data.logo,
            isActive: true,
        });

        return this.organizationRepository.create(organization);
    }
}
