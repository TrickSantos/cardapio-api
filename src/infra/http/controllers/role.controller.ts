import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateRoleUseCase } from '@useCases/role/create';
import { DeleteRoleUseCase } from '@useCases/role/delete';
import { FindRoleByIdUseCase } from '@useCases/role/findById';
import { ListAllRolesUseCase } from '@useCases/role/listAll';
import { UpdateRoleUseCase } from '@useCases/role/update';
import { CreateRoleDTO } from '../dtos/role/create.dto';
import { UpdateRoleDTO } from '../dtos/role/update.dto';

@Controller('roles')
export class RoleController {
    constructor(
        private createRole: CreateRoleUseCase,
        private listAllRoles: ListAllRolesUseCase,
        private findByIdRole: FindRoleByIdUseCase,
        private updateRole: UpdateRoleUseCase,
        private deleteRole: DeleteRoleUseCase,
    ) {}

    @Get()
    async listAll() {
        const roles = await this.listAllRoles.execute();
        return roles.map((role) => role.toJSON());
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const category = await this.findByIdRole.execute(id);
        return category.toJSON();
    }

    @Post()
    async create(@Body() body: CreateRoleDTO) {
        await this.createRole.execute(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateRoleDTO) {
        await this.updateRole.execute({
            id,
            ...body,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteRole.execute(id);
    }
}
