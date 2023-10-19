import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';

type Params = {
    organizationId?: string;
    limit?: number;
    offset?: number;
};

@Injectable()
export class ListAllUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(params?: Params): Promise<User[]> {
        return this.userRepository.findAll(params);
    }
}
