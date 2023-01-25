import { User, UserProps } from '@domain/entities/user/user';
import { faker } from '@faker-js/faker';
import { makeContact } from './contact.factory';

type Override = Partial<UserProps>;

export function makeUser(props: Override = {}): User {
    return new User({
        organizationId: 'org-id',
        contact: makeContact(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'password',
        isActive: true,
        ...props,
    });
}
