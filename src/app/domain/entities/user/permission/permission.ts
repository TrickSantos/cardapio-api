import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';

export type PermissionProps = {
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Permission {
    private _id: string;
    private props: PermissionProps;

    constructor(
        props: Replace<
            PermissionProps,
            { createdAt?: Date; updatedAt?: Date; isActive?: boolean }
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

    get isActive(): boolean {
        return this.props.isActive;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    public update(props: Partial<PermissionProps>): void {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
