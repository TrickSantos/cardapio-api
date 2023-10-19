import { User } from '@domain/entities/user/user';
import { User as PrismaUser, Contact, Role } from '@prisma/client';
import { ContactMapper } from './contact.mapper';
import { RoleMapper } from './role.mapper';

type UserPersistence = PrismaUser & {
    contacts?: Contact[];
    cargos?: Role[];
};
export class UserMapper {
    static toPersistence(user: User) {
        return {
            id: user.id,
            organizationId: user.organizationId,
            username: user.username,
            email: user.email,
            password: user.password,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            ...(user.roles && {
                roles: user.roles.map(RoleMapper.toPersistence),
            }),
            ...(user.contact && {
                contact: ContactMapper.toPersistence(user.contact),
            }),
        };
    }

    static toDomain(user: UserPersistence): User {
        const roles = user.cargos?.map(RoleMapper.toDomain);
        const contact = user.contacts
            ? ContactMapper.toDomain(user.contacts[0])
            : undefined;

        return new User(
            {
                organizationId: user.organizationId,
                username: user.username,
                email: user.email,
                password: user.password,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                contact,
                roles,
            },
            user.id,
        );
    }
}
