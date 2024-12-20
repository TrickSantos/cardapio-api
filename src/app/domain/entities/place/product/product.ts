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
    photos: string[];
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
                priceHistory?: Price[];
                photos?: string[];
            }
        >,
        id?: string,
    ) {
        this._id = id || randomUUID();
        this.props = {
            ...props,
            priceHistory: props.priceHistory || [],
            categories: props.categories || [],
            photos: props.photos || [],
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

    get photos(): string[] {
        return this.props.photos;
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

    public update(props: Partial<ProductProps>): void {
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
            categories: this.categories,
            photos: this.photos,
            isActive: this.isActive,
            price: this.props.price?.toJSON(),
            priceHistory: this.props.priceHistory.map((price) =>
                price.toJSON(),
            ),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
