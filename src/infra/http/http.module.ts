import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateOrganization } from '@useCases/organization/create';
import { DeleteOrganization } from '@useCases/organization/delete';
import { FindOrganizationById } from '@useCases/organization/findById';
import { ListAllOrganizations } from '@useCases/organization/listAll';
import { UpdateOrganization } from '@useCases/organization/update';
import { CreateUser } from '@useCases/user/create';
import { DeleteUserUseCase } from '@useCases/user/delete';
import { FindUserByIdUseCase } from '@useCases/user/findById';
import { ListAllUsersUseCase } from '@useCases/user/listAll';
import { UpdateUserUseCase } from '@useCases/user/update';
import { OrganizationsController } from './controllers/organizations.controller';
import { UsersController } from './controllers/users.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [OrganizationsController, UsersController],
    providers: [
        CreateOrganization,
        ListAllOrganizations,
        FindOrganizationById,
        UpdateOrganization,
        DeleteOrganization,
        CreateUser,
        ListAllUsersUseCase,
        FindUserByIdUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
    ],
})
export class HttpModule {}
