import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateCategoryUseCase } from '@useCases/category/create';
import { DeleteCategoryUseCase } from '@useCases/category/delete';
import { FindCategoryByIdUseCase } from '@useCases/category/findById';
import { ListAllCategoriesUseCase } from '@useCases/category/listAll';
import { UpdateCategoryUseCase } from '@useCases/category/update';
import { CreateCategoryDTO } from '../dtos/category/create.dto';
import { UpdateCategoryDTO } from '../dtos/category/update.dto';

@Controller('categories')
export class CategoryController {
    constructor(
        private createCategory: CreateCategoryUseCase,
        private listAllCategories: ListAllCategoriesUseCase,
        private findByIdCategory: FindCategoryByIdUseCase,
        private updateCategory: UpdateCategoryUseCase,
        private deleteCategory: DeleteCategoryUseCase,
    ) {}

    @Get()
    async listAll() {
        const categories = await this.listAllCategories.execute();
        return categories.map((organization) => organization.toJSON());
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const category = await this.findByIdCategory.execute(id);
        return category.toJSON();
    }

    @Post()
    async create(@Body() body: CreateCategoryDTO) {
        await this.createCategory.execute(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateCategoryDTO) {
        await this.updateCategory.execute({
            id,
            ...body,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteCategory.execute(id);
    }
}
