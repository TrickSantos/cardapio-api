import { Permission } from '@domain/entities/user/permission/permission';
import { PermissionRepository } from '@domain/repositories/permission.repository';
import { Injectable } from '@nestjs/common';

type CreatePermissionDTO = {
    name: string;
    description: string;
};

@Injectable()
export class CreatePermissionUseCase {
    constructor(private roleRepository: PermissionRepository) {}

    async execute(data: CreatePermissionDTO): Promise<void> {
        const role = new Permission({
            name: data.name,
            description: data.description,
        });

        return this.roleRepository.create(role);
    }
}
