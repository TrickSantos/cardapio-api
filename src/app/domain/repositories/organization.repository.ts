import { Organization } from '@domain/entities/organization/organization';

export abstract class OrganizationRepository {
    abstract create(organization: Organization): Promise<void>;
    abstract update(organization: Organization): Promise<void>;
    abstract delete(organization: Organization): Promise<void>;
    abstract findById(id: string): Promise<Organization>;
    abstract findAll(): Promise<Organization[]>;
}
