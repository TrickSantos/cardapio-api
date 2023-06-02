import { Section } from '@domain/entities/place/section/section';
import { InMemorySectionRepository } from '@infra/database/inMemory/section.repository';
import { makeSection } from '@test/factories/section.factory';
import { SectionNotFound } from '@useCases/errors/SectionNotFound';
import { describe, afterEach, it, expect } from 'vitest';
import { DeleteSectionUseCase } from '.';

describe('Delete Section', () => {
    let section: Section;
    const repository = new InMemorySectionRepository();
    const useCase = new DeleteSectionUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should delete a section', async () => {
        section = makeSection();
        await repository.create(section);
        await useCase.execute(section.id);
        const sections = await repository.findAll();
        expect(sections).toHaveLength(0);
    });

    it('should throw an error if section not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            SectionNotFound,
        );
    });
});
