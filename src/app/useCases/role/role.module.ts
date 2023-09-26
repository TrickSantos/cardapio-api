import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateRoleUseCase } from './create';
import { DeleteRoleUseCase } from './delete';
import { FindRoleByIdUseCase } from './findById';
import { ListAllRolesUseCase } from './listAll';
import { UpdateRoleUseCase } from './update';
import { AddUsersToRoleUseCase } from './addUsers';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreateRoleUseCase,
        DeleteRoleUseCase,
        FindRoleByIdUseCase,
        ListAllRolesUseCase,
        UpdateRoleUseCase,
        AddUsersToRoleUseCase,
    ],
    exports: [
        CreateRoleUseCase,
        DeleteRoleUseCase,
        FindRoleByIdUseCase,
        ListAllRolesUseCase,
        UpdateRoleUseCase,
        AddUsersToRoleUseCase,
    ],
})
export class RoleUseCaseModule {}
