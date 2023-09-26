import { Permission } from '@domain/entities/user/permission/permission';
import { PermissionRepository } from '@domain/repositories/permission.repository';
import { RoleRepository } from '@domain/repositories/role.repository';
import { Injectable } from '@nestjs/common';
import { RoleNotFound } from '@useCases/errors/RoleNotFound';

type UpdateRoleDTO = {
    id: string;
    name?: string;
    permissions?: string[];
    description?: string;
    isActive?: boolean;
};

@Injectable()
export class UpdateRoleUseCase {
    constructor(
        private roleRepository: RoleRepository,
        private permissionRepository: PermissionRepository,
    ) {}

    async execute({ permissions, ...data }: UpdateRoleDTO) {
        const role = await this.roleRepository.findById(data.id);

        if (!role) throw new RoleNotFound();

        if (permissions) {
            const requests = permissions.map((id) =>
                this.permissionRepository.findById(id),
            );

            const results = await Promise.all(requests);

            const permissoes = results.filter(
                (permission) => permission !== null,
            ) as Permission[];

            role.update({ permissions: permissoes });
        }

        role.update({
            name: data.name,
            description: data.description,
            isActive: data.isActive,
        });

        return this.roleRepository.update(role);
    }
}
