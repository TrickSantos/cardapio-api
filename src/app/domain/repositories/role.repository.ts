import { Role } from '@domain/entities/user/role/role';

export abstract class RoleRepository {
    abstract create(role: Role): Promise<void>;
    abstract update(role: Role): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Role | null>;
    abstract findAll(): Promise<Role[]>;
    abstract addUser(roleId: string, userId: string): Promise<void>;
    abstract removeUser(roleId: string, userId: string): Promise<void>;
}
