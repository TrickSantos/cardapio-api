import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
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
import { AddUsersToRoleUseCase } from '@useCases/role/addUsers';
import { AddUsersToRoleDTO } from '../dtos/role/addUsers.dto';

@Controller('roles')
export class RoleController {
    constructor(
        private createRole: CreateRoleUseCase,
        private listAllRoles: ListAllRolesUseCase,
        private findByIdRole: FindRoleByIdUseCase,
        private updateRole: UpdateRoleUseCase,
        private deleteRole: DeleteRoleUseCase,
        private addUsersToRole: AddUsersToRoleUseCase,
    ) {}

    @Get()
    async listAll() {
        const roles = await this.listAllRoles.execute();
        return roles.map((role) => role.toJSON());
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const role = await this.findByIdRole.execute(id);
        return role.toJSON();
    }

    @Post(':id/users')
    @HttpCode(HttpStatus.CREATED)
    async addUsers(@Param('id') id: string, @Body() body: AddUsersToRoleDTO) {
        await this.addUsersToRole.execute({
            roleId: id,
            users: body.users,
        });
    }

    @Post()
    async create(@Body() body: CreateRoleDTO) {
        await this.createRole.execute(body);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
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
