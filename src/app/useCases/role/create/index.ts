import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@domain/repositories/role.repository';
import { Role } from '@domain/entities/user/role/role';
import { PermissionRepository } from '@domain/repositories/permission.repository';
import { Permission } from '@domain/entities/user/permission/permission';

type CreateRoleDTO = {
    name: string;
    description: string;
    permissions: string[];
};

@Injectable()
export class CreateRoleUseCase {
    constructor(
        private roleRepository: RoleRepository,
        private permissionRepository: PermissionRepository,
    ) {}

    async execute({ permissions, ...data }: CreateRoleDTO): Promise<void> {
        const requests = permissions.map((id) =>
            this.permissionRepository.findById(id),
        );

        const results = await Promise.all(requests);

        const permissoes = results.filter(
            (permission) => permission !== null,
        ) as Permission[];

        const role = new Role({
            name: data.name,
            description: data.name,
            permissions: permissoes,
        });

        return this.roleRepository.create(role);
    }
}
