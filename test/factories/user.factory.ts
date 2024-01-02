import { User, UserProps } from '@domain/entities/user/user';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { makeContact } from './contact.factory';
import { Hashing } from '@helpers/hashing';

type Override = Partial<UserProps>;

export async function makeUser({
    password,
    ...props
}: Override = {}): Promise<User> {
    const hash = new Hashing();
    const secret = await hash.hash(password || 'password');

    return new User({
        organizationId: 'org-id',
        contact: makeContact(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: secret,
        isActive: true,
        ...props,
    });
}
