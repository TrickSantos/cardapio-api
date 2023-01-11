import { User } from '@domain/entities/user/user';
import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';
import { Combo } from '../combo/combo';
import { Product } from '../product/product';
import { Table } from '../table/table';

export type OrderProps = {
    placeId: string;
    orderNumber: number;
    table: Table;
    items: Product[];
    combos: Combo[];
    customer: User;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Order {
    private _id: string;
    private props: OrderProps;

    constructor(
        props: Replace<OrderProps, { createdAt?: Date; updatedAt?: Date }>,
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

    get orderNumber(): number {
        return this.props.orderNumber;
    }

    get table(): Table {
        return this.props.table;
    }

    get items(): Product[] {
        return this.props.items;
    }

    get combos(): Combo[] {
        return this.props.combos;
    }

    get customer(): User {
        return this.props.customer;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }
}
