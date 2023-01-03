import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';

type PlaceProps = {
    organizationId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    website: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Place {
    private _id: string;
    private props: PlaceProps;

    constructor(
        props: Replace<PlaceProps, { createdAt?: Date; updatedAt?: Date }>,
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

    get organizationId(): string {
        return this.props.organizationId;
    }

    get name(): string {
        return this.props.name;
    }

    get address(): string {
        return this.props.address;
    }

    get city(): string {
        return this.props.city;
    }

    get state(): string {
        return this.props.state;
    }

    get zip(): string {
        return this.props.zip;
    }

    get phone(): string {
        return this.props.phone;
    }

    get website(): string {
        return this.props.website;
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

    public update(props: Partial<PlaceProps>): void {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };
    }
}
