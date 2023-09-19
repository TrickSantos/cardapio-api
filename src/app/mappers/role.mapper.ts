import { Role } from '@domain/entities/user/role/role';
import { Role as RolePersistence } from '@prisma/client';

export class RoleMapper {
    static toPersistence(role: Role) {
        return {
            id: role.id,
            name: role.name,
            isActive: role.isActive,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
        };
    }

    static toDomain(role: RolePersistence): Role {
        return new Role(
            {
                name: role.name,
                isActive: role.isActive,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt,
            },
            role.id,
        );
    }
}
