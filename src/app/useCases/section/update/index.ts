import { SectionRepository } from '@domain/repositories/section.repository';
import { Injectable } from '@nestjs/common';
import { SectionNotFound } from '@useCases/errors/SectionNotFound';

type UpdateSectionDTO = {
    id: string;
    name?: string;
    isActive?: boolean;
};

@Injectable()
export class UpdateSectionUseCase {
    constructor(private sectionRepository: SectionRepository) {}

    async execute(data: UpdateSectionDTO) {
        const user = await this.sectionRepository.findById(data.id);
        if (user) {
            user.update({
                ...data,
            });
            return this.sectionRepository.update(user);
        } else {
            throw new SectionNotFound();
        }
    }
}
