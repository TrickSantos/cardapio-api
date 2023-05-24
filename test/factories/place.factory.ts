import { Place, PlaceProps } from '@domain/entities/place/place';
import { faker } from '@faker-js/faker/locale/pt_BR';

type Override = Partial<PlaceProps>;

export function makePlace(props: Override = {}): Place {
    return new Place({
        name: faker.company.name(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        phone: faker.phone.number(),
        website: faker.internet.url(),
        isActive: true,
        organizationId: faker.datatype.uuid(),
        ...props,
    });
}
