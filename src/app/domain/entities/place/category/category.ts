import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

export type CategoryProps = {
    placeId: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Category {
    private _id: string;
    private props: CategoryProps;

    constructor(
        props: Replace<CategoryProps, { createdAt?: Date; updatedAt?: Date }>,
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

    get placeId(): string {
        return this.props.placeId;
    }

    get name(): string {
        return this.props.name;
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

    public toPrimitives(): CategoryProps {
        return {
            placeId: this.placeId,
            name: this.name,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
