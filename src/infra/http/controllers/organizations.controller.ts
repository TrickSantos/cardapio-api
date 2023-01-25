import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateOrganization } from '@useCases/organization/create';
import { DeleteOrganization } from '@useCases/organization/delete';
import { FindOrganizationById } from '@useCases/organization/findById';
import { ListAllOrganizations } from '@useCases/organization/listAll';
import { UpdateOrganization } from '@useCases/organization/update';
import { CreateOrganizationDTO } from '../dtos/organization/create.dto';
import { UpdateOrganizationDTO } from '../dtos/organization/update.dto';

@Controller('organizations')
export class OrganizationsController {
    constructor(
        private createOrganization: CreateOrganization,
        private listAllOrganizations: ListAllOrganizations,
        private findByIdOrganization: FindOrganizationById,
        private updateOrganization: UpdateOrganization,
        private deleteOrganization: DeleteOrganization,
    ) {}

    @Get()
    async listAll() {
        const organizations = await this.listAllOrganizations.execute();
        return organizations.map((organization) => organization.toJSON());
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const organization = await this.findByIdOrganization.execute(id);
        return organization.toJSON();
    }

    @Post()
    async create(@Body() body: CreateOrganizationDTO) {
        await this.createOrganization.execute({
            name: body.name,
            logo: body.logo,
        });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateOrganizationDTO) {
        await this.updateOrganization.execute({
            id,
            name: body.name,
            logo: body.logo,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteOrganization.execute(id);
    }
}
