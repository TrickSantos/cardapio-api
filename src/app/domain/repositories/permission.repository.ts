import { Permission } from '@domain/entities/user/permission/permission';

export abstract class PermissionRepository {
    abstract create(permission: Permission): Promise<void>;
    abstract update(permission: Permission): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Permission | null>;
    abstract findAll(): Promise<Permission[]>;
}
