import { Section } from '@domain/entities/place/section/section';
import { InMemorySectionRepository } from '@infra/database/inMemory/section.repository';
import { makeSection } from '@test/factories/section.factory';
import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { ListAllSectionsUseCase } from '.';

describe('List All Sections', () => {
    let section: Section;
    const repository = new InMemorySectionRepository();
    const useCase = new ListAllSectionsUseCase(repository);

    beforeEach(() => {
        Array.from({ length: 10 }).forEach(() => {
            section = makeSection();
            repository.create(section);
        });
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all sections', async () => {
        const response = await useCase.execute();
        expect(response).toHaveLength(10);
    });
});
