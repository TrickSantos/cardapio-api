import { Contact, ContactProps } from '@domain/entities/user/contact/contact';

type Override = Partial<ContactProps>;

export function makeContact(props: Override = {}): Contact {
    return new Contact({
        firstName: 'first-name',
        lastName: 'last-name',
        email: 'email',
        phone: 'phone',
        ...props,
    });
}
