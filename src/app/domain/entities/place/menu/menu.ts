import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

export type MenuProps = {
    placeId: string;
    name: string;
    description: string;
    sequence: string[];
    hasPromotion: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Menu {
    private _id: string;
    private props: MenuProps;

    constructor(
        props: Replace<MenuProps, { createdAt?: Date; updatedAt?: Date }>,
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

    get description(): string {
        return this.props.description;
    }

    get sequence(): string[] {
        return this.props.sequence;
    }

    get hasPromotion(): boolean {
        return this.props.hasPromotion;
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

    public toPrimitives(): MenuProps {
        return {
            placeId: this.placeId,
            name: this.name,
            description: this.description,
            sequence: this.sequence,
            hasPromotion: this.hasPromotion,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
