import { Contact, ContactProps } from '@domain/entities/user/contact/contact';
import { faker } from '@faker-js/faker/locale/pt_BR';

type Override = Partial<ContactProps>;

export function makeContact(props: Override = {}): Contact {
    return new Contact({
        userId: 'user-id',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        ...props,
    });
}
