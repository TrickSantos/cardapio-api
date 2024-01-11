import { randomUUID } from 'node:crypto';
import { Product } from '../../product/product';
import { Combo } from '../../combo/combo';

type Type = 'combo' | 'product';

type ItemProps =
    | {
          productId: string;
          item: Combo;
          type: 'combo';
          description: string;
          quantity: number;
          createdAt: Date;
          updatedAt: Date;
      }
    | {
          productId: string;
          item: Product;
          type: 'product';
          description: string;
          quantity: number;
          createdAt: Date;
          updatedAt: Date;
      };

export class Item {
    private _id: string;
    private props: ItemProps;

    constructor(props: ItemProps, id?: string) {
        this._id = id ?? randomUUID();
        this.props = props;
    }

    get id(): string {
        return this._id;
    }

    get productId(): string {
        return this.props.productId;
    }

    get item(): Product | Combo {
        return this.props.item;
    }

    get type(): Type {
        return this.props.type;
    }

    get description(): string {
        return this.props.description;
    }

    get quantity(): number {
        return this.props.quantity;
    }

    get total(): number {
        if (this.type === 'combo') {
            return Number(this.item.price?.value) * this.quantity;
        } else {
            return Number(this.item.price?.value) * this.quantity;
        }
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    update({ item, type, ...props }: Partial<ItemProps>): void {
        this.props = {
            ...this.props,
            type: type ?? this.props.type,
            item: item ?? (this.props.item as any),
            ...props,
            updatedAt: new Date(),
        };
    }

    toJSON() {
        return {
            id: this.id,
            productId: this.productId,
            description: this.description,
            type: this.type,
            item: this.item.toJSON(),
            quantity: this.quantity,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
