import { Combo, ComboProps } from '@domain/entities/place/combo/combo';
import { faker } from '@faker-js/faker/locale/pt_BR';

type Override = Partial<ComboProps>;

export function makeCombo(props: Override = {}): Combo {
    return new Combo({
        placeId: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.datatype.number(),
        isActive: true,
        ...props,
    });
}
