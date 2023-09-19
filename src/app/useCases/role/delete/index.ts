import { RoleRepository } from '@domain/repositories/role.repository';
import { Injectable } from '@nestjs/common';
import { RoleNotFound } from '@useCases/errors/RoleNotFound';

@Injectable()
export class DeleteRoleUseCase {
    constructor(private roleRepository: RoleRepository) {}

    async execute(id: string) {
        const role = await this.roleRepository.findById(id);

        if (!role) throw new RoleNotFound();

        return this.roleRepository.delete(role.id);
    }
}
