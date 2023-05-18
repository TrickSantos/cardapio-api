import { Organization } from '@domain/entities/organization/organization';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllOrganizationsUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(): Promise<Organization[]> {
        return this.organizationRepository.findAll();
    }
}
