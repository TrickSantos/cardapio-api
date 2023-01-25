import { Organization } from '@domain/entities/organization/organization';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { Injectable } from '@nestjs/common';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';

@Injectable()
export class FindOrganizationById {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(id: string): Promise<Organization> {
        const response = await this.organizationRepository.findById(id);
        if (response) {
            return response;
        } else {
            throw new OrganizationNotFound();
        }
    }
}
