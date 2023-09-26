import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';
import { Contact } from './contact/contact';
import { Permission } from './permission/permission';
import { Role } from './role/role';

export type UserProps = {
    organizationId: string;
    username: string;
    password: string;
    email: string;
    isActive: boolean;
    contact?: Contact;
    createdAt: Date;
    updatedAt: Date;
};

export class User {
    private _id: string;
    private props: UserProps;
    private _roles: Map<string, Role>;
    private _permissions: Map<string, Permission>;

    constructor(
        props: Replace<
            UserProps,
            {
                createdAt?: Date;
                updatedAt?: Date;
                permissions?: Permission[];
                roles?: Role[];
                contact?: Contact;
            }
        >,
        id?: string,
    ) {
        this._id = id || randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
        };
        this._roles = new Map();
        this._permissions = new Map();

        if (props.roles) {
            props.roles.forEach((role) => this._roles.set(role.id, role));
        }

        if (props.permissions) {
            props.permissions.forEach((permission) =>
                this._permissions.set(permission.id, permission),
            );
        }
    }

    get id(): string {
        return this._id;
    }

    get organizationId(): string {
        return this.props.organizationId;
    }

    get username(): string {
        return this.props.username;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }

    get permissions(): Permission[] {
        return Array.from(this._permissions.values());
    }

    get roles(): Role[] {
        return Array.from(this._roles.values());
    }

    get contact(): Contact | undefined {
        return this.props.contact;
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

    public addRole(role: Role): void {
        this._roles.set(role.id, role);
    }

    public addPermission(permission: Permission): void {
        this._permissions.set(permission.id, permission);
    }

    public removeRole(role: Role): void {
        this._roles.delete(role.id);
    }

    public removePermission(permission: Permission): void {
        this._permissions.delete(permission.id);
    }

    public update(
        props: Partial<
            UserProps & {
                permissions: Permission[];
                roles: Role[];
                contact: Contact;
            }
        >,
    ): void {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };

        if (props.contact) {
            this.props.contact = props.contact;
        }

        if (props.roles) {
            this._roles = new Map();
            props.roles.forEach((role) => this._roles.set(role.id, role));
        }

        if (props.permissions) {
            this._permissions = new Map();
            props.permissions.forEach((permission) =>
                this._permissions.set(permission.id, permission),
            );
        }
    }

    public toJSON() {
        return {
            id: this.id,
            organizationId: this.organizationId,
            username: this.username,
            email: this.email,
            permissions: this.permissions.map((permission) =>
                permission.toJSON(),
            ),
            roles: this.roles.map((role) => role.toJSON()),
            contact: this.contact?.toJSON(),
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
