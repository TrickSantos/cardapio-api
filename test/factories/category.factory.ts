import { faker } from '@faker-js/faker';
import {
    Category,
    CategoryProps,
} from '@domain/entities/place/category/category';

type Override = Partial<CategoryProps>;

export function makeCategory(props: Override = {}): Category {
    return new Category({
        placeId: faker.datatype.uuid(),
        name: faker.commerce.department(),
        isActive: true,
        ...props,
    });
}
