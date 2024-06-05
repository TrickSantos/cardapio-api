import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './create';
import { DeleteUserUseCase } from './delete';
import { FindUserByIdUseCase } from './findById';
import { ListAllUsersUseCase } from './listAll';
import { UpdateUserUseCase } from './update';
import { FindUserByEmailUseCase } from './findByEmail';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreateUserUseCase,
        DeleteUserUseCase,
        FindUserByIdUseCase,
        FindUserByEmailUseCase,
        ListAllUsersUseCase,
        UpdateUserUseCase,
    ],
    exports: [
        CreateUserUseCase,
        DeleteUserUseCase,
        FindUserByIdUseCase,
        ListAllUsersUseCase,
        UpdateUserUseCase,
        FindUserByEmailUseCase,
    ],
})
export class UserUseCaseModule {}
