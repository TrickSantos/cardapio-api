import { Permission } from '@domain/entities/user/permission/permission';
import { PermissionRepository } from '@domain/repositories/permission.repository';
import { Injectable } from '@nestjs/common';
import { PermissionNotFound } from '@useCases/errors/PermissionNotFound';

@Injectable()
export class FindPermissionByIdUseCase {
    constructor(private readonly permissionRepository: PermissionRepository) {}

    async execute(id: string): Promise<Permission> {
        const permission = await this.permissionRepository.findById(id);

        if (!permission) throw new PermissionNotFound();

        return permission;
    }
}
