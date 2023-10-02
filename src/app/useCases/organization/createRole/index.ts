import { Role } from '@domain/entities/organization/role/role';
import { Permission } from '@domain/entities/user/permission/permission';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { PermissionRepository } from '@domain/repositories/permission.repository';
import { Injectable } from '@nestjs/common';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';

type CreateOrganizationRoleDTO = {
    name: string;
    organizationId: string;
    description: string;
    permissions: string[];
};

@Injectable()
export class CreateOrganizationRoleUseCase {
    constructor(
        private organizationRepository: OrganizationRepository,
        private permissionRepository: PermissionRepository,
    ) {}

    async execute({
        permissions,
        ...data
    }: CreateOrganizationRoleDTO): Promise<void> {
        const organization = await this.organizationRepository.findById(
            data.organizationId,
        );

        if (!organization) {
            throw new OrganizationNotFound();
        }

        const requests = (await Promise.all(
            permissions.map((permission) =>
                this.permissionRepository.findById(permission),
            ),
        )) as Permission[];

        const role = new Role({
            ...data,
            permissions: requests,
        });

        return this.organizationRepository.createRole(role);
    }
}
