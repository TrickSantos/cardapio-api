import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateOrganizationUseCase } from './create';
import { DeleteOrganizationUseCase } from './delete';
import { FindOrganizationByIdUseCase } from './findById';
import { ListAllOrganizationsUseCase } from './listAll';
import { UpdateOrganizationUseCase } from './update';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreateOrganizationUseCase,
        DeleteOrganizationUseCase,
        FindOrganizationByIdUseCase,
        ListAllOrganizationsUseCase,
        UpdateOrganizationUseCase,
    ],
    exports: [
        CreateOrganizationUseCase,
        DeleteOrganizationUseCase,
        FindOrganizationByIdUseCase,
        ListAllOrganizationsUseCase,
        UpdateOrganizationUseCase,
    ],
})
export class OrganizationUseCaseModule {}
