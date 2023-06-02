import { Section } from '@domain/entities/place/section/section';
import { InMemorySectionRepository } from '@infra/database/inMemory/section.repository';
import { makeSection } from '@test/factories/section.factory';
import { SectionNotFound } from '@useCases/errors/SectionNotFound';
import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { UpdateSectionUseCase } from '.';

describe('Update Section', () => {
    let section: Section;
    const repository = new InMemorySectionRepository();
    const useCase = new UpdateSectionUseCase(repository);

    beforeEach(() => {
        section = makeSection();
        repository.create(section);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should update a section', async () => {
        const updatedSection = makeSection();
        await useCase.execute({
            id: section.id,
            name: updatedSection.name,
        });
        const foundSection = await repository.findById(section.id);
        expect(foundSection).toBeDefined();
        expect(foundSection?.name).toEqual(updatedSection.name);
    });

    it('should throw an error if section not found', async () => {
        await expect(
            useCase.execute({ ...makeSection(), id: 'invalid-id' }),
        ).rejects.toThrow(SectionNotFound);
    });
});
