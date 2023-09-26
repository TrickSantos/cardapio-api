import { Permission } from '@domain/entities/user/permission/permission';
import { Permission as PermissionPersistence } from '@prisma/client';

export class PermissionMapper {
    static toPersistence(permission: Permission) {
        return {
            id: permission.id,
            name: permission.name,
            description: permission.description,
            isActive: permission.isActive,
            createdAt: permission.createdAt,
            updatedAt: permission.updatedAt,
        };
    }

    static toDomain(permission: PermissionPersistence): Permission {
        return new Permission(
            {
                name: permission.name,
                description: permission.description,
                isActive: permission.isActive,
                createdAt: permission.createdAt,
                updatedAt: permission.updatedAt,
            },
            permission.id,
        );
    }
}
