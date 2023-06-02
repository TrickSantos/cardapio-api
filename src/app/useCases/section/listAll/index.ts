import { Section } from '@domain/entities/place/section/section';
import { SectionRepository } from '@domain/repositories/section.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllSectionsUseCase {
    constructor(private sectionRepository: SectionRepository) {}

    async execute(): Promise<Section[]> {
        return this.sectionRepository.findAll();
    }
}
