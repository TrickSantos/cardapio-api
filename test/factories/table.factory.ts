import { Table, TableProps } from '@domain/entities/place/table/table';
import { faker } from '@faker-js/faker/locale/pt_BR';

type Override = Partial<TableProps>;

export function makeTable(props: Override = {}): Table {
    return new Table({
        placeId: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        isActive: true,
        ...props,
    });
}
