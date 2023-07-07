import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateOrganizationUseCase } from './create';
import { DeleteOrganizationUseCase } from './delete';
import { FindOrganizationByIdUseCase } from './findById';
import { ListAllOrganizationsUseCase } from './listAll';
import { UpdateOrganizationUseCase } from './update';
import { FindAllPlacesUseCase } from './findAllPlaces';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreateOrganizationUseCase,
        DeleteOrganizationUseCase,
        FindOrganizationByIdUseCase,
        ListAllOrganizationsUseCase,
        UpdateOrganizationUseCase,
        FindAllPlacesUseCase,
    ],
    exports: [
        CreateOrganizationUseCase,
        DeleteOrganizationUseCase,
        FindOrganizationByIdUseCase,
        ListAllOrganizationsUseCase,
        UpdateOrganizationUseCase,
        FindAllPlacesUseCase,
    ],
})
export class OrganizationUseCaseModule {}
