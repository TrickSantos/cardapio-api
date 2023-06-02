import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateMenuUseCase } from '@useCases/menu/create';
import { DeleteMenuUseCase } from '@useCases/menu/delete';
import { FindMenuByIdUseCase } from '@useCases/menu/findById';
import { ListAllMenusUseCase } from '@useCases/menu/listAll';
import { UpdateMenuUseCase } from '@useCases/menu/update';
import { CreateMenuDTO } from '../dtos/menu/create.dto';
import { UpdateMenuDTO } from '../dtos/menu/update.dto';

@Controller('menus')
export class MenuController {
    constructor(
        private createMenu: CreateMenuUseCase,
        private listAllMenus: ListAllMenusUseCase,
        private findByIdMenu: FindMenuByIdUseCase,
        private updateMenu: UpdateMenuUseCase,
        private deleteMenu: DeleteMenuUseCase,
    ) {}

    @Get()
    async listAll() {
        const menus = await this.listAllMenus.execute();
        return menus.map((organization) => organization.toJSON());
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const menu = await this.findByIdMenu.execute(id);
        return menu.toJSON();
    }

    @Post()
    async create(@Body() body: CreateMenuDTO) {
        await this.createMenu.execute(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateMenuDTO) {
        await this.updateMenu.execute({
            id,
            ...body,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteMenu.execute(id);
    }
}
