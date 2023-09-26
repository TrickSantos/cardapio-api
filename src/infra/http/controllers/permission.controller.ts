import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreatePermissionUseCase } from '@useCases/permission/create';
import { DeletePermissionUseCase } from '@useCases/permission/delete';
import { FindPermissionByIdUseCase } from '@useCases/permission/findById';
import { ListAllPermissionsUseCase } from '@useCases/permission/listAll';
import { UpdatePermissionUseCase } from '@useCases/permission/update';
import { CreatePermissionDTO } from '../dtos/permission/create.dto';
import { UpdatePermissionDTO } from '../dtos/permission/update.dto';

@Controller('permissions')
export class PermissionController {
    constructor(
        private createPermission: CreatePermissionUseCase,
        private listAllPermissions: ListAllPermissionsUseCase,
        private findByIdPermission: FindPermissionByIdUseCase,
        private updatePermission: UpdatePermissionUseCase,
        private deletePermission: DeletePermissionUseCase,
    ) {}

    @Get()
    async listAll() {
        const permissions = await this.listAllPermissions.execute();
        return permissions.map((permission) => permission.toJSON());
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const permission = await this.findByIdPermission.execute(id);
        return permission.toJSON();
    }

    @Post()
    async create(@Body() body: CreatePermissionDTO) {
        await this.createPermission.execute(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdatePermissionDTO) {
        await this.updatePermission.execute({
            id,
            ...body,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deletePermission.execute(id);
    }
}
