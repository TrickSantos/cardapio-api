import { User, UserProps } from '@domain/entities/user/user';
import { makeContact } from './contact.factory';

type Override = Partial<UserProps>;

export function makeUser(props: Override = {}): User {
    return new User({
        organizationId: 'org-id',
        contact: makeContact(),
        username: 'username',
        email: 'email',
        password: 'password',
        isActive: true,
        ...props,
    });
}
