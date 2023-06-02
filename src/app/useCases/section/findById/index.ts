import { Section } from '@domain/entities/place/section/section';
import { SectionRepository } from '@domain/repositories/section.repository';
import { Injectable } from '@nestjs/common';
import { SectionNotFound } from '@useCases/errors/SectionNotFound';

@Injectable()
export class FindSectionByIdUseCase {
    constructor(private readonly sectionRepository: SectionRepository) {}

    async execute(id: string): Promise<Section> {
        const section = await this.sectionRepository.findById(id);
        if (section) {
            return section;
        } else {
            throw new SectionNotFound();
        }
    }
}
