import { PermissionRepository } from '@domain/repositories/permission.repository';
import { Injectable } from '@nestjs/common';
import { PermissionNotFound } from '@useCases/errors/PermissionNotFound';

@Injectable()
export class DeletePermissionUseCase {
    constructor(private permissionRepository: PermissionRepository) {}

    async execute(id: string) {
        const permission = await this.permissionRepository.findById(id);

        if (!permission) throw new PermissionNotFound();

        return this.permissionRepository.delete(permission.id);
    }
}
