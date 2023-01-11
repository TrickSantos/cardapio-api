import { Order } from '@domain/entities/place/order/order';

export abstract class OrderRepository {
    abstract create(order: Order): Promise<void>;
    abstract update(order: Order): Promise<void>;
    abstract delete(order: Order): Promise<void>;
    abstract findById(id: string): Promise<Order>;
    abstract findAll(): Promise<Order[]>;
}
