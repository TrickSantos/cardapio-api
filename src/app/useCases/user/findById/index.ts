import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserNotFound } from '@useCases/errors/UserNotFound';

@Injectable()
export class FindUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (user) {
            return user;
        } else {
            throw new UserNotFound();
        }
    }
}
