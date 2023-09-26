import { Role } from '@domain/entities/user/role/role';
import { RoleRepository } from '@domain/repositories/role.repository';
import { Injectable } from '@nestjs/common';
import { RoleNotFound } from '@useCases/errors/RoleNotFound';

@Injectable()
export class FindRoleByIdUseCase {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(id: string): Promise<Role> {
        const role = await this.roleRepository.findById(id);

        if (!role) throw new RoleNotFound();

        return role;
    }
}
