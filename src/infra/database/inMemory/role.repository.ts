import { Permission } from '@domain/entities/user/permission/permission';
import { Role } from '@domain/entities/user/role/role';
import { User } from '@domain/entities/user/user';
import { RoleRepository } from '@domain/repositories/role.repository';

export class InMemoryRoleRepository implements RoleRepository {
    private roles: Map<string, Role> = new Map();
    private _users: Map<string, User> = new Map();
    private _permissions: Map<string, Permission> = new Map();

    async create(role: Role): Promise<void> {
        this.roles.set(role.id, role);
    }

    async update(role: Role): Promise<void> {
        this.roles.set(role.id, role);
    }

    async findById(id: string): Promise<Role | null> {
        const role = this.roles.get(id);

        if (role) return role;

        return null;
    }

    async findAll(): Promise<Role[]> {
        return Array.from(this.roles.values());
    }

    async delete(id: string): Promise<void> {
        this.roles.delete(id);
    }

    async addUser(roleId: string, userId: string): Promise<void> {
        const role = this.roles.get(roleId);
        const user = this._users.get(userId);

        if (!role) return;
        if (!user) return;

        role.addUser(user);

        this.roles.set(roleId, role);
    }

    async removeUser(roleId: string, userId: string): Promise<void> {
        const role = this.roles.get(roleId);
        const user = this._users.get(userId);

        if (!role) return;
        if (!user) return;

        role.removeUser(user);
    }

    reset() {
        this.roles = new Map();
        this._permissions = new Map();
        this._users = new Map();
    }

    set users(users: User[]) {
        this._users = new Map();
        users.forEach((user) => this._users.set(user.id, user));
    }

    get users(): User[] {
        return Array.from(this._users.values());
    }

    set permissions(permissions: Permission[]) {
        this._permissions = new Map();
        permissions.forEach((permission) =>
            this._permissions.set(permission.id, permission),
        );
    }

    get permissions(): Permission[] {
        return Array.from(this._permissions.values());
    }
}
