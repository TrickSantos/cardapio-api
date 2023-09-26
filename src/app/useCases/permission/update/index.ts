import { Injectable } from '@nestjs/common';
import { PermissionNotFound } from '@useCases/errors/PermissionNotFound';
import { PermissionRepository } from '@domain/repositories/permission.repository';

type UpdatePermissionDTO = {
    id: string;
    name?: string;
    description?: string;
    isActive?: boolean;
};

@Injectable()
export class UpdatePermissionUseCase {
    constructor(private permissionRepository: PermissionRepository) {}

    async execute(data: UpdatePermissionDTO) {
        const permission = await this.permissionRepository.findById(data.id);

        if (!permission) throw new PermissionNotFound();

        permission.update({
            name: data.name,
            description: data.description,
            isActive: data.isActive,
        });

        return this.permissionRepository.update(permission);
    }
}
