import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';

export type ContactProps = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
};

export class Contact {
    private _id: string;
    private props: ContactProps;

    constructor(
        props: Replace<ContactProps, { createdAt?: Date; updatedAt?: Date }>,
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

    get userId(): string {
        return this.props.userId;
    }

    get firstName(): string {
        return this.props.firstName;
    }

    get lastName(): string {
        return this.props.lastName;
    }

    get email(): string {
        return this.props.email;
    }

    get phone(): string {
        return this.props.phone;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    public update(props: Partial<ContactProps>): void {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };
    }

    public toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
