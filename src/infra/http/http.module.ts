import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateOrganization } from '@useCases/organization/create';
import { DeleteOrganization } from '@useCases/organization/delete';
import { FindOrganizationById } from '@useCases/organization/findById';
import { ListAllOrganizations } from '@useCases/organization/listAll';
import { UpdateOrganization } from '@useCases/organization/update';
import { OrganizationsController } from './controllers/organizations.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [OrganizationsController],
    providers: [
        CreateOrganization,
        ListAllOrganizations,
        FindOrganizationById,
        UpdateOrganization,
        DeleteOrganization,
    ],
})
export class HttpModule {}
