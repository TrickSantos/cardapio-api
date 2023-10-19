import { Contact } from '@domain/entities/user/contact/contact';
import { Contact as ContactPersistence } from '@prisma/client';

export class ContactMapper {
    static toPersistence(contact: Contact) {
        return {
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            userId: contact.userId,
            phone: contact.phone,
            email: contact.email,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        };
    }

    static toDomain(contact: ContactPersistence): Contact {
        return new Contact(
            {
                userId: contact.userId,
                firstName: contact.firstName,
                lastName: contact.lastName,
                phone: contact.phone,
                email: contact.email,
                createdAt: contact.createdAt,
                updatedAt: contact.updatedAt,
            },
            contact.id,
        );
    }
}
