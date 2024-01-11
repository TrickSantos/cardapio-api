import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/replace';
import { Product } from '../product/product';
import { Price } from '../price/price';

export type ComboProps = {
    placeId: string;
    name: string;
    description: string;
    price: Price;
    isActive: boolean;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
};

export class Combo {
    private _id: string;
    private props: ComboProps;

    constructor(
        props: Replace<
            ComboProps,
            { products?: Product[]; createdAt?: Date; updatedAt?: Date }
        >,
        id?: string,
    ) {
        this._id = id || randomUUID();
        this.props = {
            ...props,
            products: props.products || [],
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

    get price(): Price {
        return this.props.price;
    }

    get products(): Product[] {
        return this.props.products;
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

    public update(props: Partial<ComboProps>): void {
        this.props = {
            ...this.props,
            ...props,
            updatedAt: new Date(),
        };
    }

    toJSON() {
        return {
            id: this.id,
            placeId: this.placeId,
            name: this.name,
            description: this.description,
            price: this.price.toJSON(),
            products: this.products.map((product) => product.toJSON()),
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
