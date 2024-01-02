import { Section } from '@domain/entities/place/section/section';
import { InMemorySectionRepository } from '@infra/database/inMemory/section.repository';
import { makeSection } from '@test/factories/section.factory';
import { SectionNotFound } from '@useCases/errors/SectionNotFound';
import { describe, afterAll, beforeAll, it, expect } from 'vitest';
import { UpdateSectionUseCase } from '.';

describe('Update Section', () => {
    let section: Section;
    const repository = new InMemorySectionRepository();
    const useCase = new UpdateSectionUseCase(repository);

    beforeAll(() => {
        section = makeSection();
        repository.create(section);
    });

    afterAll(() => {
        repository.reset();
    });

    it('should update a section', async () => {
        await useCase.execute({
            id: section.id,
            name: 'updated name',
        });
        const foundSection = await repository.findById(section.id);
        expect(foundSection).toBeDefined();
        expect(foundSection?.name).toEqual('updated name');
    });

    it('should throw an error if section not found', async () => {
        await expect(
            useCase.execute({ ...section, id: 'invalid-id' }),
        ).rejects.toThrow(SectionNotFound);
    });
});
