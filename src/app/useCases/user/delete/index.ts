import { UserRepository } from '@domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserNotFound } from '@useCases/errors/UserNotFound';

@Injectable()
export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string) {
        const user = await this.userRepository.findById(id);
        if (user) {
            return this.userRepository.delete(id);
        } else {
            throw new UserNotFound();
        }
    }
}
