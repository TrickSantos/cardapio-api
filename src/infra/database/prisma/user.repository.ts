import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) {}

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.id,
                organizationId: user.organizationId,
                username: user.username,
                email: user.email,
                password: user.password,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    }

    async update(user: User): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                organizationId: user.organizationId,
                username: user.username,
                email: user.email,
                password: user.password,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
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
        });

        if (user) {
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

        return null;
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();

        return users.map(
            (user) =>
                new User(
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
                ),
        );
    }
}
