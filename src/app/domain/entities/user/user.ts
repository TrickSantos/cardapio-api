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
    permissions: Permission[];
    roles: Role[];
    contact: Contact;
    createdAt: Date;
    updatedAt: Date;
};

export class User {
    private _id: string;
    private props: UserProps;

    constructor(
        props: Replace<
            UserProps,
            {
                createdAt?: Date;
                updatedAt?: Date;
                permissions?: Permission[];
                roles?: Role[];
            }
        >,
        id?: string,
    ) {
        this._id = id || randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
            permissions: props.permissions || [],
            roles: props.roles || [],
        };
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
        return this.props.permissions;
    }

    get roles(): Role[] {
        return this.props.roles;
    }

    get contact(): Contact {
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

    public update(props: Partial<UserProps>): void {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };
    }

    public toJSON() {
        return {
            id: this.id,
            organizationId: this.organizationId,
            username: this.username,
            email: this.email,
            permissions: this.permissions,
            roles: this.roles,
            contact: this.contact,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
