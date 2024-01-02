import { describe, it, expect, afterAll } from 'vitest';
import { InMemoryPlaceRepository } from '@infra/database/inMemory/place.repository';
import { makePlace } from '@test/factories/place.factory';
import { CreatePlaceUseCase } from '.';

describe('Create Place', () => {
    const place = makePlace();
    const repository = new InMemoryPlaceRepository();
    const useCase = new CreatePlaceUseCase(repository);

    afterAll(() => {
        repository.reset();
    });

    it('should create a user', async () => {
        await useCase.execute(place);
        const places = await repository.findAll();
        expect(places).toHaveLength(1);
    });
});
