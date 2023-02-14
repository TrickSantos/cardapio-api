import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateOrganization } from '@useCases/organization/create';
import { DeleteOrganization } from '@useCases/organization/delete';
import { FindOrganizationById } from '@useCases/organization/findById';
import { ListAllOrganizations } from '@useCases/organization/listAll';
import { UpdateOrganization } from '@useCases/organization/update';
import { CreatePlaceUseCase } from '@useCases/place/create';
import { DeletePlaceUseCase } from '@useCases/place/delete';
import { FindPlaceByIdUseCase } from '@useCases/place/findById';
import { ListAllPlacesUseCase } from '@useCases/place/listAll';
import { UpdatePlaceUseCase } from '@useCases/place/update';
import { CreateUser } from '@useCases/user/create';
import { DeleteUserUseCase } from '@useCases/user/delete';
import { FindUserByIdUseCase } from '@useCases/user/findById';
import { ListAllUsersUseCase } from '@useCases/user/listAll';
import { UpdateUserUseCase } from '@useCases/user/update';
import { OrganizationsController } from './controllers/organizations.controller';
import { PlacesController } from './controllers/place.controller';
import { UsersController } from './controllers/users.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [OrganizationsController, UsersController, PlacesController],
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
        CreatePlaceUseCase,
        ListAllPlacesUseCase,
        FindPlaceByIdUseCase,
        UpdatePlaceUseCase,
        DeletePlaceUseCase,
    ],
})
export class HttpModule {}
