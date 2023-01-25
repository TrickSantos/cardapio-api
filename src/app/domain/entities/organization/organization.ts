import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';

export interface OrganizationProps {
    name: string;
    logo: string;
    isActive: boolean;
    createdAt: Date | null;
    updatedAt: Date;
}

export class Organization implements OrganizationProps {
    private _id: string;
    private props: OrganizationProps;

    constructor(
        props: Replace<
            OrganizationProps,
            { createdAt?: Date; updatedAt?: Date }
        >,
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

    get logo(): string {
        return this.props.logo;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    get createdAt(): Date | null {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    public update(props: Partial<OrganizationProps>): void {
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
            logo: this.logo,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
