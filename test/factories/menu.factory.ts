import { Menu, MenuProps } from '@domain/entities/place/menu/menu';
import { faker } from '@faker-js/faker/locale/pt_BR';

type Override = Partial<MenuProps>;

export function makeMenu(props: Override = {}): Menu {
    return new Menu({
        placeId: faker.datatype.uuid(),
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        hasPromotion: faker.datatype.boolean(),
        sequence: [],
        isActive: true,
        ...props,
    });
}
