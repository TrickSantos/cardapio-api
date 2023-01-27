import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}
