import { Permission } from '@domain/entities/user/permission/permission';
import { User } from '@domain/entities/user/user';
import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';

export type RoleProps = {
    name: string;
    description: string;
    organizationId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Role {
    private _id: string;
    private props: RoleProps;
    private _permissions: Map<string, Permission>;
    private _users: Map<string, User>;

    constructor(
        props: Replace<
            RoleProps,
            {
                createdAt?: Date;
                updatedAt?: Date;
                isActive?: boolean;
                permissions?: Permission[];
                users?: User[];
            }
        >,
        id?: string,
    ) {
        this._id = id || randomUUID();
        this.props = {
            ...props,
            isActive: props.isActive || true,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
        };
        this._permissions = new Map();
        this._users = new Map();

        if (props.permissions) {
            props.permissions.forEach((permission) =>
                this._permissions.set(permission.id, permission),
            );
        }

        if (props.users) {
            props.users.forEach((user) => this._users.set(user.id, user));
        }
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get description(): string {
        return this.props.description;
    }

    get organizationId(): string {
        return this.props.organizationId;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    get permissions(): Permission[] {
        return Array.from(this._permissions.values());
    }

    get users(): User[] {
        return Array.from(this._users.values());
    }

    public addPermission(permission: Permission): void {
        this._permissions.set(permission.id, permission);
    }

    public removePermission(permission: Permission): void {
        this._permissions.delete(permission.id);
    }

    public addUser(user: User): void {
        this._users.set(user.id, user);
    }

    public removeUser(user: User): void {
        this._users.delete(user.id);
    }

    public update({
        permissions,
        ...props
    }: Partial<RoleProps & { permissions: Permission[] }>): void {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };
        permissions?.forEach((permission) =>
            this._permissions.set(permission.id, permission),
        );
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            organizationId: this.organizationId,
            permissions: this.permissions.map((permission) =>
                permission.toJSON(),
            ),
            users: this.users.map((user) => user.toJSON()),
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
