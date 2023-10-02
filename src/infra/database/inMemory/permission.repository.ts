import { Permission } from '@domain/entities/user/permission/permission';
import { PermissionRepository } from '@domain/repositories/permission.repository';

export class InMemoryPermissionRepository implements PermissionRepository {
    private _permissions: Map<string, Permission> = new Map();

    async create(permission: Permission): Promise<void> {
        this._permissions.set(permission.id, permission);
    }

    async update(permission: Permission): Promise<void> {
        this._permissions.set(permission.id, permission);
    }

    async findById(id: string): Promise<Permission | null> {
        const permission = this._permissions.get(id);
        if (permission) return permission;

        return null;
    }

    async findAll(): Promise<Permission[]> {
        return Array.from(this._permissions.values());
    }

    async delete(id: string): Promise<void> {
        this._permissions.delete(id);
    }

    get permissions(): Permission[] {
        return Array.from(this._permissions.values());
    }

    set permissions(permissions: Permission[]) {
        this._permissions = new Map();
        permissions.forEach((permission) =>
            this._permissions.set(permission.id, permission),
        );
    }

    reset() {
        this._permissions = new Map();
    }
}
