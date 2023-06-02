import { User } from '@domain/entities/user/user';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class UserMapper {
    static toPersistence(user: User): Prisma.UserUncheckedCreateInput {
        return {
            id: user.id,
            organizationId: user.organizationId,
            username: user.username,
            email: user.email,
            password: user.password,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    static toDomain(user: PrismaUser): User {
        return new User(
            {
                organizationId: user.organizationId,
                username: user.username,
                email: user.email,
                password: user.password,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            user.id,
        );
    }
}
