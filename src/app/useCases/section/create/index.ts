import { Section } from '@domain/entities/place/section/section';
import { SectionRepository } from '@domain/repositories/section.repository';
import { Injectable } from '@nestjs/common';

type CreateSectionDTO = {
    categoryId: string;
    menuId: string;
    name: string;
};

@Injectable()
export class CreateSectionUseCase {
    constructor(private sectionRepository: SectionRepository) {}

    async execute(data: CreateSectionDTO): Promise<void> {
        const category = new Section({
            categoryId: data.categoryId,
            menuId: data.menuId,
            name: data.name,
            isActive: true,
        });

        return this.sectionRepository.create(category);
    }
}
