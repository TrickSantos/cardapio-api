import { Organization } from '@domain/entities/organization/organization';
import { Role } from '@domain/entities/organization/role/role';
import { Place } from '@domain/entities/place/place';
import { Permission } from '@domain/entities/user/permission/permission';
import { User } from '@domain/entities/user/user';
import { OrganizationRepository } from '@domain/repositories/organization.repository';

export class InMemoryOrganizationRepository implements OrganizationRepository {
    private _organizations: Map<string, Organization> = new Map();
    private _places: Map<string, Map<string, Place>> = new Map();
    private _users: Map<string, Map<string, User>> = new Map();
    private _organizationsRoles: Map<string, Map<string, Role>> = new Map();
    private _roles: Map<string, Role> = new Map();
    private _permissions: Map<string, Map<string, Permission>> = new Map();

    async create(organization: Organization): Promise<void> {
        this._organizations.set(organization.id, organization);
    }

    async update(organization: Organization): Promise<void> {
        this._organizations.set(organization.id, organization);
    }

    async delete(id: string): Promise<void> {
        this._organizations.delete(id);
    }

    async findAll(): Promise<Organization[]> {
        return Array.from(this._organizations.values());
    }

    async findAllPlaces(id: string): Promise<Place[]> {
        const places = this._places.get(id);

        if (places) {
            return Array.from(places.values());
        }

        return [];
    }

    async findById(id: string) {
        const organization = this._organizations.get(id);

        if (organization) {
            return organization;
        }

        return null;
    }

    async findRoles(id: string): Promise<Role[]> {
        const roles = this._organizationsRoles.get(id);

        if (roles) {
            return Array.from(roles.values());
        }

        return [];
    }

    async findPermissions(id: string): Promise<Permission[]> {
        const permissions = this._permissions.get(id);

        if (permissions) {
            return Array.from(permissions.values());
        }

        return [];
    }

    async createRole(role: Role): Promise<void> {
        const roleMap =
            this._organizationsRoles.get(role.organizationId) || new Map();
        roleMap.set(role.id, role);
        this._organizationsRoles.set(role.organizationId, roleMap);
        this._roles.set(role.id, role);
    }

    async deleteRole(id: string): Promise<void> {
        this._roles.delete(id);
    }

    get organizations(): Organization[] {
        return Array.from(this._organizations.values());
    }

    set organizations(organization: Organization[]) {
        const organizationsMap = new Map();
        organization.forEach((organization) => {
            organizationsMap.set(organization.id, organization);
        });
        this._organizations = organizationsMap;
    }

    set permissions({
        organizationId,
        permissions,
    }: {
        organizationId: string;
        permissions: Permission[];
    }) {
        const permissionsMap = new Map();
        permissions.forEach((permission) => {
            permissionsMap.set(permission.id, permission);
        });
        this._permissions.set(organizationId, permissionsMap);
    }

    set users({
        organizationId,
        users,
    }: {
        organizationId: string;
        users: User[];
    }) {
        const usersMap = new Map();
        users.forEach((user) => {
            usersMap.set(user.id, user);
        });
        this._users.set(organizationId, usersMap);
    }

    set roles({
        organizationId,
        roles,
    }: {
        organizationId: string;
        roles: Role[];
    }) {
        const rolesMap = new Map();
        roles.forEach((role) => {
            rolesMap.set(role.id, role);
        });
        this._organizationsRoles.set(organizationId, rolesMap);
    }

    set places({
        organizationId,
        places,
    }: {
        organizationId: string;
        places: Place[];
    }) {
        const placesMap = new Map();
        places.forEach((place) => {
            placesMap.set(place.id, place);
        });
        this._places.set(organizationId, placesMap);
    }

    reset(): void {
        this._organizations = new Map();
        this._organizationsRoles = new Map();
        this._permissions = new Map();
        this._roles = new Map();
        this._users = new Map();
        this._places = new Map();
    }
}
