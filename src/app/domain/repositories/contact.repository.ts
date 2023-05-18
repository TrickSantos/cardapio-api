import { Contact } from '@domain/entities/user/contact/contact';

export abstract class ContactRepository {
    abstract create(contact: Contact): Promise<void>;
    abstract update(contact: Contact): Promise<void>;
    abstract delete(contact: Contact): Promise<void>;
    abstract findById(id: string): Promise<Contact | null>;
    abstract findAll(): Promise<Contact[]>;
}
