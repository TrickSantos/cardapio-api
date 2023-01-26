import { Organization } from '@domain/entities/organization/organization';
import { OrganizationRepository } from '@domain/repositories/organization.repository';

export class OrganizationInMemoryRepository implements OrganizationRepository {
    private organizations: Organization[] = [];

    async create(organization: Organization): Promise<void> {
        this.organizations.push(organization);
    }

    async update(organization: Organization): Promise<void> {
        const current = this.organizations.find(
            (org) => org.id === organization.id,
        );
        if (current) {
            current.update(organization);
        }
    }

    async delete(id: string): Promise<void> {
        const current = this.organizations.find((org) => org.id === id);
        if (current) {
            current.update({ isActive: false });
        }
    }

    async findAll(): Promise<Organization[]> {
        return this.organizations.filter((org) => org.isActive);
    }

    async findById(id: string): Promise<Organization> {
        return this.organizations.find(
            (organization) => organization.id === id,
        );
    }

    reset(): void {
        this.organizations = [];
    }
}
