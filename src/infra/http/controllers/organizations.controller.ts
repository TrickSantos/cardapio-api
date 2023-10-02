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
import { ListAllOrganizationPermissionsUseCase } from '@useCases/organization/listAllPermissions';
import { FindAllOrganizationRolesUseCase } from '@useCases/organization/findAllRoles';
import { CreateOrganizationRoleUseCase } from '@useCases/organization/createRole';
import { CreateOrganizationRoleDTO } from '../dtos/organization/createRole.dto';

@Controller('organizations')
export class OrganizationsController {
    constructor(
        private createOrganization: CreateOrganizationUseCase,
        private createOrganizationRole: CreateOrganizationRoleUseCase,
        private listAllOrganizations: ListAllOrganizationsUseCase,
        private listAllPermissions: ListAllOrganizationPermissionsUseCase,
        private findByIdOrganization: FindOrganizationByIdUseCase,
        private findAllPlaces: FindAllPlacesUseCase,
        private findAllRoles: FindAllOrganizationRolesUseCase,
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

    @Get(':id/roles')
    async findRoles(@Param('id') id: string) {
        const roles = await this.findAllRoles.execute(id);
        return roles.map((role) => role.toJSON());
    }

    @Get(':id/permissions')
    async findPermissions(@Param('id') id: string) {
        const permissions = await this.listAllPermissions.execute(id);
        return permissions.map((permission) => permission.toJSON());
    }

    @Post()
    async create(@Body() body: CreateOrganizationDTO) {
        await this.createOrganization.execute({
            name: body.name,
            logo: body.logo,
        });
    }

    @Post(':id/roles')
    async createRole(
        @Param('id') id: string,
        @Body() body: CreateOrganizationRoleDTO,
    ) {
        await this.createOrganizationRole.execute({
            ...body,
            organizationId: id,
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
