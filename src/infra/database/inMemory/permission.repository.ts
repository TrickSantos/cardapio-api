import { Permission } from '@domain/entities/user/permission/permission';
import { PermissionRepository } from '@domain/repositories/permission.repository';

export class InMemoryPermissionRepository implements PermissionRepository {
    private permissions: Map<string, Permission> = new Map();

    async create(permission: Permission): Promise<void> {
        this.permissions.set(permission.id, permission);
    }

    async update(permission: Permission): Promise<void> {
        this.permissions.set(permission.id, permission);
    }

    async findById(id: string): Promise<Permission | null> {
        const permission = this.permissions.get(id);
        if (permission) return permission;

        return null;
    }

    async findAll(): Promise<Permission[]> {
        return Array.from(this.permissions.values());
    }

    async delete(id: string): Promise<void> {
        this.permissions.delete(id);
    }

    reset() {
        this.permissions = new Map();
    }
}
