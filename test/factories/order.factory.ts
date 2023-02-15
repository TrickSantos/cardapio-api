import { Order, OrderProps } from '@domain/entities/place/order/order';
import { faker } from '@faker-js/faker';
import { makeTable } from './table.factory';
import { makeUser } from './user.factory';

type Override = Partial<OrderProps>;

export function makeOrder(props: Override = {}): Order {
    return new Order({
        placeId: faker.datatype.uuid(),
        tableId: faker.datatype.uuid(),
        customerId: faker.datatype.uuid(),
        customer: makeUser(),
        combos: [],
        orderNumber: faker.datatype.number(),
        table: makeTable(),
        isActive: true,
        items: [],
        ...props,
    });
}
