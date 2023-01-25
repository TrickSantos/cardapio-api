import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { Injectable } from '@nestjs/common';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';

@Injectable()
export class DeleteOrganization {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(id: string): Promise<void> {
        const organization = await this.organizationRepository.findById(id);
        if (organization) {
            return this.organizationRepository.delete(organization);
        } else {
            throw new OrganizationNotFound();
        }
    }
}
