import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './create';
import { DeleteUserUseCase } from './delete';
import { FindUserByIdUseCase } from './findById';
import { ListAllUsersUseCase } from './listAll';
import { UpdateUserUseCase } from './update';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreateUserUseCase,
        DeleteUserUseCase,
        FindUserByIdUseCase,
        ListAllUsersUseCase,
        UpdateUserUseCase,
    ],
    exports: [
        CreateUserUseCase,
        DeleteUserUseCase,
        FindUserByIdUseCase,
        ListAllUsersUseCase,
        UpdateUserUseCase,
    ],
})
export class UserUseCaseModule {}
