import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';
import { Category } from '../category/category';
import { Price } from '../price/price';

export type ProductProps = {
    placeId: string;
    name: string;
    description: string;
    categories: Category[];
    price: Price | null;
    priceHistory: Price[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Product {
    private _id: string;
    private props: ProductProps;

    constructor(
        props: Replace<
            ProductProps,
            {
                createdAt?: Date;
                updatedAt?: Date;
                categories?: Category[];
                price?: Price;
                priceHistory?: Price[];
            }
        >,
        id?: string,
    ) {
        this._id = id || randomUUID();
        this.props = {
            ...props,
            price: props.price || null,
            priceHistory: props.priceHistory || [],
            categories: props.categories || [],
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

    get categories(): Category[] {
        return this.props.categories;
    }

    get price(): Price | null {
        return this.props.price;
    }

    get priceHistory(): Price[] {
        return this.props.priceHistory;
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

    public toJSON(): ProductProps {
        return {
            placeId: this.placeId,
            name: this.name,
            description: this.description,
            categories: this.categories,
            isActive: this.isActive,
            price: this.props.price,
            priceHistory: this.props.priceHistory,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
