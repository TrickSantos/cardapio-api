import { Role } from '@domain/entities/user/role/role';
import { RoleRepository } from '@domain/repositories/role.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllRolesUseCase {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(): Promise<Role[]> {
        return this.roleRepository.findAll();
    }
}
