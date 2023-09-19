import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@domain/repositories/role.repository';
import { Role } from '@domain/entities/user/role/role';

type CreateRoleDTO = {
    name: string;
};

@Injectable()
export class CreateRoleUseCase {
    constructor(private roleRepository: RoleRepository) {}

    async execute(data: CreateRoleDTO): Promise<void> {
        const role = new Role({
            name: data.name,
        });

        return this.roleRepository.create(role);
    }
}
