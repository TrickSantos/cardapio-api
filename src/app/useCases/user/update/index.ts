import { UserRepository } from '@domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserNotFound } from '@useCases/errors/UserNotFound';

type UpdateUserDTO = {
    id: string;
    username?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
};

@Injectable()
export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: UpdateUserDTO) {
        const user = await this.userRepository.findById(data.id);
        if (user) {
            user.update({
                ...data,
            });
            return this.userRepository.update(user);
        } else {
            throw new UserNotFound();
        }
    }
}
