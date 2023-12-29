import { UserRepository } from '@domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@domain/entities/user/user';
import { Contact } from '@domain/entities/user/contact/contact';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { Role } from '@domain/entities/user/role/role';
import { Hashing } from '@helpers/hashing';

type CreateUserDTO = {
    organizationId: string;
    username: string;
    password: string;
    email: string;
    isActive: boolean;
    permissions?: string[];
    roles: string[];
    contact: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
};

@Injectable()
export class CreateUserUseCase {
    #hash: Hashing;
    constructor(
        private userRepository: UserRepository,
        private roleRepository: OrganizationRepository,
    ) {
        this.#hash = new Hashing();
    }

    async execute({ roles, ...data }: CreateUserDTO): Promise<void> {
        const requests = roles.map((id) =>
            this.roleRepository.findRoleById(id),
        );

        const results = await Promise.all(requests);

        const cargos = results.filter((role) => role !== null) as Role[];

        const password = await this.#hash.hash(data.password);

        const user = new User({
            organizationId: data.organizationId,
            username: data.username,
            email: data.email,
            isActive: true,
            permissions: [],
            roles: cargos,
            password,
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
