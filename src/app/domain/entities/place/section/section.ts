import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

export type SectionProps = {
    menuId: string;
    categoryId: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Section {
    private _id: string;
    private props: SectionProps;

    constructor(
        props: Replace<SectionProps, { createdAt?: Date; updatedAt?: Date }>,
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

    get menuId(): string {
        return this.props.menuId;
    }

    get name(): string {
        return this.props.name;
    }

    get categoryId(): string {
        return this.props.categoryId;
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

    update(props: Partial<SectionProps>) {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };
    }

    public toJSON() {
        return {
            id: this.id,
            menuId: this.menuId,
            name: this.name,
            categoryId: this.categoryId,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
