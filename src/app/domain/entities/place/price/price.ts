import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

export type PriceProps = {
    productId: string;
    value: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Price {
    private _id: string;
    private props: PriceProps;

    constructor(
        props: Replace<
            PriceProps,
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

    get productId(): string {
        return this.props.productId;
    }

    get value(): number {
        return this.props.value;
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

    public update(props: Partial<PriceProps>): void {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };
    }

    public toJSON() {
        return {
            id: this.id,
            productId: this.productId,
            value: this.value,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
