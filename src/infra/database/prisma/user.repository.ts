import { User } from '@domain/entities/user/user';
import {
    FindAllQuery,
    UserRepository,
} from '@domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserMapper } from '@mappers/user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) {}

    async create(user: User): Promise<void> {
        const { contact, roles, ...data } = UserMapper.toPersistence(user);
        console.log(roles, contact);
        await this.prisma.user.create({
            data: {
                ...data,
                cargos: {
                    connect: roles.map((role) => ({
                        id: role.id,
                    })),
                },
                ...(contact && {
                    contacts: {
                        create: {
                            email: contact.email,
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            phone: contact.phone,
                            id: contact.id,
                        },
                    },
                }),
            },
        });
    }

    async update(user: User): Promise<void> {
        const { contact, roles, ...data } = UserMapper.toPersistence(user);
        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                ...data,
                roles: {
                    set: roles.map((role) => ({
                        id: role.id,
                    })),
                },
                ...(contact && {
                    contacts: {
                        update: {
                            data: {
                                email: contact.email,
                                firstName: contact.firstName,
                                lastName: contact.lastName,
                                phone: contact.phone,
                                id: contact.id,
                            },
                            where: {
                                id: contact.id,
                            },
                        },
                    },
                }),
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                isActive: false,
            },
        });
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                contacts: true,
            },
        });

        if (!user) return null;

        return UserMapper.toDomain(user);
    }

    async findAll({
        organizationId,
        limit,
        offset,
    }: FindAllQuery): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            where: {
                ...(organizationId && { organizationId }),
            },
            include: {
                contacts: true,
                cargos: true,
            },
            ...(limit && { take: limit }),
            ...(offset && { skip: offset }),
        });

        return users.map(UserMapper.toDomain);
    }
}
