import { Injectable } from '@nestjs/common';
import { User } from '@domain/entities/user/user';
import { RoleRepository } from '@domain/repositories/role.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { RoleNotFound } from '@useCases/errors/RoleNotFound';
import { UserNotFound } from '@useCases/errors/UserNotFound';

type AddUsersToRoleDTO = {
    roleId: string;
    users: string[];
};

@Injectable()
export class AddUsersToRoleUseCase {
    constructor(
        private roleRepository: RoleRepository,
        private userRepository: UserRepository,
    ) {}

    async execute(props: AddUsersToRoleDTO): Promise<void> {
        const role = await this.roleRepository.findById(props.roleId);

        if (!role) throw new RoleNotFound();

        const users = await Promise.all(
            props.users.map((userId) => this.userRepository.findById(userId)),
        );

        const usersFound = users.filter((user) => user !== null) as User[];

        if (usersFound.length !== props.users.length) throw new UserNotFound();

        await Promise.all(
            usersFound.map((user) =>
                this.roleRepository.addUser(role.id, user.id),
            ),
        );
    }
}
