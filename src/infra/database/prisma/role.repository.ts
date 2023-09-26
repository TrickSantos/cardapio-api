import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RoleRepository } from '@domain/repositories/role.repository';
import { Role } from '@domain/entities/user/role/role';
import { RoleMapper } from '@mappers/role.mapper';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
    constructor(private prisma: PrismaService) {}

    async create(role: Role): Promise<void> {
        const {
            permissions,
            users: _,
            ...data
        } = RoleMapper.toPersistence(role);
        await this.prisma.role.create({
            data: {
                ...data,
                permissions: {
                    connect: permissions.map(({ id }) => ({ id })),
                },
            },
        });
    }

    async addUser(roleId: string, userId: string): Promise<void> {
        await this.prisma.role.update({
            where: { id: roleId },
            data: {
                users: {
                    connect: { id: userId },
                },
            },
        });
    }

    async removeUser(roleId: string, userId: string): Promise<void> {
        await this.prisma.role.update({
            where: { id: roleId },
            data: {
                users: {
                    disconnect: { id: userId },
                },
            },
        });
    }

    async update(role: Role): Promise<void> {
        const { permissions, users, ...data } = RoleMapper.toPersistence(role);
        await this.prisma.role.update({
            where: { id: role.id },
            data: {
                ...data,
                permissions: {
                    set: permissions.map(({ id }) => ({ id })),
                },
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.role.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }

    async findById(id: string): Promise<Role | null> {
        const role = await this.prisma.role.findUnique({
            where: { id },
        });

        if (role) return RoleMapper.toDomain(role);

        return null;
    }

    async findAll(): Promise<Role[]> {
        const roles = await this.prisma.role.findMany({
            include: {
                permissions: true,
            },
        });
        return roles.map(RoleMapper.toDomain);
    }
}
