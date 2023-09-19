import { Role } from '@domain/entities/user/role/role';
import { RoleRepository } from '@domain/repositories/role.repository';

export class InMemoryRoleRepository implements RoleRepository {
    private roles: Map<string, Role> = new Map();

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

    reset() {
        this.roles = new Map();
    }
}
