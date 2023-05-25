import { Price, PriceProps } from '@domain/entities/place/price/price';
import { faker } from '@faker-js/faker/locale/pt_BR';

type Override = Partial<PriceProps>;

export function makePrice(props: Override = {}): Price {
    return new Price({
        productId: faker.datatype.uuid(),
        value: faker.datatype.number(),
        isActive: true,
        ...props,
    });
}
