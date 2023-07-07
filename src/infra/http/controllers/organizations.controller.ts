import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateOrganizationUseCase } from '@useCases/organization/create';
import { DeleteOrganizationUseCase } from '@useCases/organization/delete';
import { FindOrganizationByIdUseCase } from '@useCases/organization/findById';
import { ListAllOrganizationsUseCase } from '@useCases/organization/listAll';
import { UpdateOrganizationUseCase } from '@useCases/organization/update';
import { CreateOrganizationDTO } from '../dtos/organization/create.dto';
import { UpdateOrganizationDTO } from '../dtos/organization/update.dto';
import { FindAllPlacesUseCase } from '@useCases/organization/findAllPlaces';

@Controller('organizations')
export class OrganizationsController {
    constructor(
        private createOrganization: CreateOrganizationUseCase,
        private listAllOrganizations: ListAllOrganizationsUseCase,
        private findByIdOrganization: FindOrganizationByIdUseCase,
        private findAllPlaces: FindAllPlacesUseCase,
        private updateOrganization: UpdateOrganizationUseCase,
        private deleteOrganization: DeleteOrganizationUseCase,
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

    @Get(':id/places')
    async findPlaces(@Param('id') id: string) {
        const places = await this.findAllPlaces.execute(id);
        return places.map((place) => place.toJSON());
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
            ...body,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteOrganization.execute(id);
    }
}
