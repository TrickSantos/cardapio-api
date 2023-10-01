import { Permission } from '@domain/entities/user/permission/permission';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { Injectable } from '@nestjs/common';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';

@Injectable()
export class ListAllOrganizationPermissionsUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(organizationId: string): Promise<Permission[]> {
        const organization = await this.organizationRepository.findById(
            organizationId,
        );

        if (!organization) {
            throw new OrganizationNotFound();
        }

        return this.organizationRepository.findPermissions(organizationId);
    }
}
