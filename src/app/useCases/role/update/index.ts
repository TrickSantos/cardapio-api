import { RoleRepository } from '@domain/repositories/role.repository';
import { Injectable } from '@nestjs/common';
import { RoleNotFound } from '@useCases/errors/RoleNotFound';

type UpdateRoleDTO = {
    id: string;
    name?: string;
    isActive?: boolean;
};

@Injectable()
export class UpdateRoleUseCase {
    constructor(private roleRepository: RoleRepository) {}

    async execute(data: UpdateRoleDTO) {
        const role = await this.roleRepository.findById(data.id);

        if (!role) throw new RoleNotFound();

        role.update({
            name: data.name,
            isActive: data.isActive,
        });

        return this.roleRepository.update(role);
    }
}
