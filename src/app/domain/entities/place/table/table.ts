import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

export type TableProps = {
    placeId: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Table {
    private _id: string;
    private props: TableProps;

    constructor(
        props: Replace<TableProps, { createdAt?: Date; updatedAt?: Date }>,
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

    public toJSON(): TableProps {
        return {
            placeId: this.placeId,
            name: this.name,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
