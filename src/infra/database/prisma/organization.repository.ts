import { Organization } from '@domain/entities/organization/organization';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { OrganizationMapper } from '@mappers/organization.mapper';
import { PrismaService } from './prisma.service';

export class PrismaOrganizationRepository implements OrganizationRepository {
    constructor(private prisma: PrismaService) {}

    async create(organization: Organization): Promise<void> {
        const data = OrganizationMapper.toPersistence(organization);
        await this.prisma.organization.create({
            data,
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
        const organizations = await this.prisma.organization.findMany();
        return organizations.map(OrganizationMapper.toDomain);
    }
}
