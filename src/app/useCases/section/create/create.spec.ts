import { Section } from '@domain/entities/place/section/section';
import { InMemorySectionRepository } from '@infra/database/inMemory/section.repository';
import { makeSection } from '@test/factories/section.factory';
import { describe, afterEach, it, expect } from 'vitest';
import { CreateSectionUseCase } from '.';

describe('Create Section', () => {
    let section: Section;
    const repository = new InMemorySectionRepository();
    const useCase = new CreateSectionUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a section', async () => {
        section = makeSection();
        await useCase.execute(section);
        const sections = await repository.findAll();
        expect(sections).toHaveLength(1);
        expect(sections[0].name).toEqual(section.name);
    });
});
