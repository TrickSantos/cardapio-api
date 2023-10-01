import { Organization } from '@domain/entities/organization/organization';
import { Role } from '@domain/entities/organization/role/role';
import { Place } from '@domain/entities/place/place';
import { Permission } from '@domain/entities/user/permission/permission';

export abstract class OrganizationRepository {
    abstract create(organization: Organization): Promise<void>;
    abstract update(organization: Organization): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Organization | null>;
    abstract findAll(): Promise<Organization[]>;
    abstract findAllPlaces(id: string): Promise<Place[]>;
    abstract findRoles(id: string): Promise<Role[]>;
    abstract findPermissions(id: string): Promise<Permission[]>;
    abstract createRole(role: Role): Promise<void>;
    abstract deleteRole(id: string): Promise<void>;
}
