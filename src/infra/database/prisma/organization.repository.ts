import { Organization } from '@domain/entities/organization/organization';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { OrganizationMapper } from '@mappers/organization.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Place } from '@domain/entities/place/place';
import { PlaceMapper } from '@mappers/place.mapper';
import { Role } from '@domain/entities/organization/role/role';
import { Permission } from '@domain/entities/user/permission/permission';
import { OrganizationRoleMapper } from '@mappers/organizationRole.mapper';
import { PermissionMapper } from '@mappers/permission.mapper';
import defaultOrganizationPermissions from '@helpers/constants/default/organization/permissions';
import defaultOrganizationRoles from '@helpers/constants/default/organization/roles';
import permissionsToRole from '@helpers/constants/default/organization/permissionsToRole';

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAllPlaces(id: string): Promise<Place[]> {
        const places = await this.prisma.place.findMany({
            where: {
                organizationId: id,
            },
        });

        return places.map((place) => PlaceMapper.toDomain(place));
    }

    async create(organization: Organization): Promise<void> {
        const data = OrganizationMapper.toPersistence(organization);

        const permissionsIds = await this.prisma.permission.findMany({
            where: {
                name: {
                    in: defaultOrganizationPermissions.map(
                        (permission) => permission.name,
                    ),
                },
            },
            select: {
                id: true,
            },
        });

        await this.prisma.$transaction(async (tx) => {
            await tx.organization.create({
                data: {
                    ...data,
                    roles: {
                        createMany: {
                            data: defaultOrganizationRoles,
                            skipDuplicates: true,
                        },
                    },
                    permissions: {
                        connect: permissionsIds.map((permission) => ({
                            id: permission.id,
                        })),
                    },
                },
            });

            const rolesIds = await tx.organizationRole.findMany({
                where: {
                    organizationId: data.id,
                },
                select: {
                    id: true,
                    name: true,
                },
            });

            await Promise.all(
                rolesIds.map(async (role) => {
                    const permissionsNames = permissionsToRole[
                        role.name
                    ] as string[];

                    const permissionsIds = await Promise.all(
                        permissionsNames.map((perm) => {
                            return tx.permission.findFirstOrThrow({
                                where: {
                                    name: perm,
                                },
                                select: {
                                    id: true,
                                },
                            });
                        }),
                    );

                    return tx.organizationRole.update({
                        where: {
                            id: role.id,
                        },
                        data: {
                            permissions: {
                                connect: permissionsIds.map((permission) => ({
                                    id: permission.id,
                                })),
                            },
                        },
                    });
                }),
            );
        });
    }

    async update(organization: Organization): Promise<void> {
        await this.prisma.organization.update({
            where: { id: organization.id },
            data: {
                name: organization.name,
                logo: organization.logo,
                isActive: organization.isActive,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.organization.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }

    async findById(id: string): Promise<Organization | null> {
        const organization = await this.prisma.organization.findUnique({
            where: { id },
        });
        if (organization) {
            return OrganizationMapper.toDomain(organization);
        }
        return null;
    }

    async findAll(): Promise<Organization[]> {
        const organizations = await this.prisma.organization.findMany({
            where: {
                isActive: true,
            },
        });
        return organizations.map(OrganizationMapper.toDomain);
    }

    async findRoles(id: string): Promise<Role[]> {
        const roles = await this.prisma.organizationRole.findMany({
            where: {
                organizationId: id,
                isActive: true,
            },
            include: {
                permissions: true,
                users: true,
            },
        });

        return roles.map(OrganizationRoleMapper.toDomain);
    }

    async findPermissions(id: string): Promise<Permission[]> {
        const permissions = await this.prisma.permission.findMany({
            where: {
                isActive: true,
                organizations: {
                    some: {
                        id,
                    },
                },
            },
        });

        return permissions.map(PermissionMapper.toDomain);
    }

    async createRole(role: Role): Promise<void> {
        const data = OrganizationRoleMapper.toPersistence(role);

        await this.prisma.organizationRole.create({
            data: {
                ...data,
                permissions: {
                    connect: data.permissions?.map((permission) => ({
                        id: permission.id,
                    })),
                },
                users: {
                    connect: data.users?.map((user) => ({
                        id: user.id,
                    })),
                },
            },
        });
    }

    async deleteRole(id: string): Promise<void> {
        await this.prisma.organizationRole.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }
}
