import { Section } from '@domain/entities/place/section/section';
import { InMemorySectionRepository } from '@infra/database/inMemory/section.repository';
import { makeSection } from '@test/factories/section.factory';
import { SectionNotFound } from '@useCases/errors/SectionNotFound';
import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { FindSectionByIdUseCase } from '.';

describe('FindSectionById', () => {
    let section: Section;
    const repository = new InMemorySectionRepository();
    const useCase = new FindSectionByIdUseCase(repository);

    beforeEach(() => {
        section = makeSection();
        repository.create(section);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should find a section by id', async () => {
        const response = await useCase.execute(section.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(section.id);
        expect(response.name).toEqual(section.name);
    });

    it('should throw an error if section not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            SectionNotFound,
        );
    });
});
