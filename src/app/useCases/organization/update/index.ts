import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { Injectable } from '@nestjs/common';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';

type UpdateOrganizationDTO = {
    id: string;
    name?: string;
    logo?: string;
    isActive?: boolean;
};
@Injectable()
export class UpdateOrganizationUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(org: UpdateOrganizationDTO): Promise<void> {
        const organization = await this.organizationRepository.findById(org.id);

        if (!organization) throw new OrganizationNotFound();

        organization.update({
            ...org,
        });
        return this.organizationRepository.update(organization);
    }
}
