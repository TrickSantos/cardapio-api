import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateSectionUseCase } from '@useCases/section/create';
import { DeleteSectionUseCase } from '@useCases/section/delete';
import { FindSectionByIdUseCase } from '@useCases/section/findById';
import { ListAllSectionsUseCase } from '@useCases/section/listAll';
import { UpdateSectionUseCase } from '@useCases/section/update';
import { CreateSectionDTO } from '../dtos/section/create.dto';
import { UpdateSectionDTO } from '../dtos/section/update.dto';

@Controller('sections')
export class SectionController {
    constructor(
        private createSection: CreateSectionUseCase,
        private listAllSections: ListAllSectionsUseCase,
        private findByIdSection: FindSectionByIdUseCase,
        private updateSection: UpdateSectionUseCase,
        private deleteSection: DeleteSectionUseCase,
    ) {}

    @Get()
    async listAll() {
        const sections = await this.listAllSections.execute();
        return sections.map((organization) => organization.toJSON());
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const section = await this.findByIdSection.execute(id);
        return section.toJSON();
    }

    @Post()
    async create(@Body() body: CreateSectionDTO) {
        await this.createSection.execute(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateSectionDTO) {
        await this.updateSection.execute({
            id,
            ...body,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteSection.execute(id);
    }
}
