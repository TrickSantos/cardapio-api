import { Role } from '@domain/entities/organization/role/role';
import {
    OrganizationRole as PrismaRole,
    Permission,
    User,
} from '@prisma/client';
import { PermissionMapper } from './permission.mapper';
import { UserMapper } from './user.mapper';

type OrganizationRolePersistence = PrismaRole & {
    permissions?: Permission[];
    users?: User[];
};

export class OrganizationRoleMapper {
    static toPersistence(role: Role) {
        return {
            id: role.id,
            name: role.name,
            description: role.description,
            organizationId: role.organizationId,
            isActive: role.isActive,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
            ...(role.permissions && {
                permissions: role.permissions.map((permission) => ({
                    id: permission.id,
                })),
            }),
            ...(role.users && {
                users: role.users.map((user) => ({ id: user.id })),
            }),
        };
    }

    static toDomain(role: OrganizationRolePersistence): Role {
        const permissions = role.permissions?.map(PermissionMapper.toDomain);
        const users = role.users?.map(UserMapper.toDomain);

        return new Role(
            {
                name: role.name,
                description: role.description,
                organizationId: role.organizationId,
                isActive: role.isActive,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt,
                permissions,
                users,
            },
            role.id,
        );
    }
}
