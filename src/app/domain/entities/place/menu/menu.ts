import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';
import { Section } from '../section/section';

export type MenuProps = {
    placeId: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    sections: Section[];
};

export class Menu {
    private _id: string;
    private props: MenuProps;

    constructor(
        props: Replace<
            MenuProps,
            { createdAt?: Date; updatedAt?: Date; sections?: Section[] }
        >,
        id?: string,
    ) {
        this._id = id || randomUUID();
        this.props = {
            ...props,
            sections: props.sections || [],
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

    get sections(): Section[] {
        return this.props.sections;
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

    update(props: Partial<MenuProps>): void {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };
    }

    public toJSON() {
        return {
            id: this.id,
            placeId: this.placeId,
            name: this.name,
            description: this.description,
            isActive: this.isActive,
            sections: this.sections.map((section) => section.toJSON()),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
