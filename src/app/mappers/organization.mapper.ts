import { Organization } from '@domain/entities/organization/organization';
import { Organization as PrismaOrganization } from '@prisma/client';

export class OrganizationMapper {
    public static toPersistence(organization: Organization) {
        return {
            id: organization.id,
            logo: organization.logo,
            name: organization.name,
            isActive: organization.isActive,
            createdAt: organization.createdAt,
            updatedAt: organization.updatedAt,
        };
    }

    public static toDomain(data: PrismaOrganization): Organization {
        return new Organization(
            {
                logo: data.logo,
                name: data.name,
                isActive: data.isActive,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            },
            data.id,
        );
    }
}
