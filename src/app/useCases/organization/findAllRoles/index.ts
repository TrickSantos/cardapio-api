import { Role } from '@domain/entities/user/role/role';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { Injectable } from '@nestjs/common';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';

@Injectable()
export class FindAllOrganizationRolesUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(id: string): Promise<Role[]> {
        const organization = await this.organizationRepository.findById(id);

        if (!organization) {
            throw new OrganizationNotFound();
        }

        return await this.organizationRepository.findRoles(id);
    }
}
