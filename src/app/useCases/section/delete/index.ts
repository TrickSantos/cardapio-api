import { SectionRepository } from '@domain/repositories/section.repository';
import { Injectable } from '@nestjs/common';
import { SectionNotFound } from '@useCases/errors/SectionNotFound';

@Injectable()
export class DeleteSectionUseCase {
    constructor(private sectionRepository: SectionRepository) {}

    async execute(id: string) {
        const place = await this.sectionRepository.findById(id);
        if (place) {
            return this.sectionRepository.delete(id);
        } else {
            throw new SectionNotFound();
        }
    }
}
