import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserNotFound } from '@useCases/errors/UserNotFound';

@Injectable()
export class FindUserByEmailUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (user) {
            return user;
        } else {
            throw new UserNotFound();
        }
    }
}
