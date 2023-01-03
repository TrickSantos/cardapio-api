import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';

export type RoleProps = {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

export class Role {
    private _id: string;
    private props: RoleProps;

    constructor(
        props: Replace<RoleProps, { createdAt?: Date; updatedAt?: Date }>,
        id?: string,
    ) {
        this._id = id || randomUUID();
        this.props = {
            ...props,
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

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    public update(props: Partial<RoleProps>): void {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };
    }

    public toPrimitives(): RoleProps {
        return this.props;
    }
}
