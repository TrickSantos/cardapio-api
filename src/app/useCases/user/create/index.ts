import { UserRepository } from '@domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@domain/entities/user/user';
import { Contact } from '@domain/entities/user/contact/contact';

type CreateUserDTO = {
    organizationId: string;
    username: string;
    password: string;
    email: string;
    isActive: boolean;
    permissions?: string[];
    roles?: string[];
    contact: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
};

@Injectable()
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: CreateUserDTO): Promise<void> {
        const user = new User({
            organizationId: data.organizationId,
            username: data.username,
            email: data.email,
            isActive: true,
            permissions: [],
            roles: [],
            password: data.password,
        });

        user.update({
            contact: new Contact({
                firstName: data.contact.firstName,
                lastName: data.contact.lastName,
                email: data.contact.email,
                phone: data.contact.phone,
                userId: user.id,
            }),
        });

        return this.userRepository.create(user);
    }
}
