import { describe, it, expect } from 'vitest';
import { makeContact } from '@test/factories/contact.factory';

describe('Contact', () => {
    it('should create a contact', () => {
        const contact = makeContact();

        expect(contact).toBeDefined();
    });

    it('should update a contact', () => {
        const contact = makeContact();

        contact.update({
            firstName: 'new-first-name',
        });

        expect(contact.firstName).toBe('new-first-name');
    });
});
