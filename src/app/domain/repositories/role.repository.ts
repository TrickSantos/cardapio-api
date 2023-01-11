import { Role } from '@domain/entities/user/role/role';

export abstract class RoleRepository {
    abstract create(role: Role): Promise<void>;
    abstract update(role: Role): Promise<void>;
    abstract delete(role: Role): Promise<void>;
    abstract findById(id: string): Promise<Role>;
    abstract findAll(): Promise<Role[]>;
}
