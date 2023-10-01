import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateOrganizationUseCase } from './create';
import { DeleteOrganizationUseCase } from './delete';
import { FindOrganizationByIdUseCase } from './findById';
import { ListAllOrganizationsUseCase } from './listAll';
import { UpdateOrganizationUseCase } from './update';
import { FindAllPlacesUseCase } from './findAllPlaces';
import { CreateOrganizationRoleUseCase } from './createRole';
import { FindAllOrganizationRolesUseCase } from './findAllRoles';
import { ListAllOrganizationPermissionsUseCase } from './listAllPermissions';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreateOrganizationUseCase,
        DeleteOrganizationUseCase,
        FindOrganizationByIdUseCase,
        ListAllOrganizationsUseCase,
        UpdateOrganizationUseCase,
        FindAllPlacesUseCase,
        CreateOrganizationRoleUseCase,
        FindAllOrganizationRolesUseCase,
        ListAllOrganizationPermissionsUseCase,
    ],
    exports: [
        CreateOrganizationUseCase,
        DeleteOrganizationUseCase,
        FindOrganizationByIdUseCase,
        ListAllOrganizationsUseCase,
        UpdateOrganizationUseCase,
        FindAllPlacesUseCase,
        CreateOrganizationRoleUseCase,
        FindAllOrganizationRolesUseCase,
        ListAllOrganizationPermissionsUseCase,
    ],
})
export class OrganizationUseCaseModule {}
