import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PermissionRepository } from '@domain/repositories/permission.repository';
import { Permission } from '@domain/entities/user/permission/permission';
import { PermissionMapper } from '@mappers/permission.mapper';

@Injectable()
export class PrismaPermissionRepository implements PermissionRepository {
    constructor(private prisma: PrismaService) {}

    async create(permission: Permission): Promise<void> {
        const data = PermissionMapper.toPersistence(permission);
        await this.prisma.permission.create({
            data,
        });
    }

    async update(permission: Permission): Promise<void> {
        const data = PermissionMapper.toPersistence(permission);
        await this.prisma.permission.update({
            where: { id: permission.id },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.permission.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }

    async findById(id: string): Promise<Permission | null> {
        const permission = await this.prisma.permission.findUnique({
            where: { id },
        });

        if (permission) return PermissionMapper.toDomain(permission);

        return null;
    }

    async findAll(): Promise<Permission[]> {
        const permissions = await this.prisma.permission.findMany();
        return permissions.map(PermissionMapper.toDomain);
    }
}
