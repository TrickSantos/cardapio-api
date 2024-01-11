import { User } from '@domain/entities/user/user';
import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';
import { Table } from '../table/table';
import { Item } from './item/item';

type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'delivered'
    | 'completed'
    | 'canceled';

export type OrderProps = {
    placeId: string;
    orderNumber: number;
    table?: Table;
    tableId: string;
    items: Item[];
    customer?: User;
    customerId: string;
    status: OrderStatus;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Order {
    private _id: string;
    private props: OrderProps;

    constructor(
        props: Replace<
            OrderProps,
            { createdAt?: Date; updatedAt?: Date; status?: OrderStatus }
        >,
        id?: string,
    ) {
        this._id = id || randomUUID();
        this.props = {
            ...props,
            status: props.status || 'pending',
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

    get status(): OrderStatus {
        return this.props.status;
    }

    get tableId(): string {
        return this.props.tableId;
    }

    get table(): Table | undefined {
        return this.props.table;
    }

    get items(): Item[] {
        return this.props.items;
    }

    get customerId(): string {
        return this.props.customerId;
    }

    get customer(): User | undefined {
        return this.props.customer;
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

    get total(): number {
        return this.items.reduce(
            (acc, item) => acc + (item.item.price?.value ?? 0),
            0,
        );
    }

    public update(props: Partial<OrderProps>): void {
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
            orderNumber: this.orderNumber,
            status: this.status,
            tableId: this.tableId,
            table: this.table?.toJSON(),
            items: this.items.map((item) => item.toJSON()),
            customer: this.customer?.toJSON(),
            customerId: this.customerId,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            total: this.total,
        };
    }
}
