import { Contact } from './contact';

describe('Contact', () => {
    it('should create a contact', () => {
        const contact = new Contact({
            firstName: 'first-name',
            lastName: 'last-name',
            email: 'email',
            phone: 'phone',
        });

        expect(contact).toBeDefined();
    });

    it('should update a contact', () => {
        const contact = new Contact({
            firstName: 'first-name',
            lastName: 'last-name',
            email: 'email',
            phone: 'phone',
        });

        contact.update({
            firstName: 'new-first-name',
        });

        expect(contact.firstName).toBe('new-first-name');
    });
});
