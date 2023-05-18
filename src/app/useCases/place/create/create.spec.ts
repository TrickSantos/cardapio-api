import { describe, afterEach, it, expect } from 'vitest';
import { Place } from '@domain/entities/place/place';
import { InMemoryPlaceRepository } from '@infra/database/inMemory/place.repository';
import { makePlace } from '@test/factories/place.factory';
import { CreatePlaceUseCase } from '.';

describe('Create Place', () => {
    let place: Place;
    const repository = new InMemoryPlaceRepository();
    const useCase = new CreatePlaceUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a user', async () => {
        place = makePlace();
        await useCase.execute(place);
        const places = await repository.findAll();
        expect(places).toHaveLength(1);
        expect(places[0].name).toEqual(place.name);
        expect(places[0].organizationId).toEqual(place.organizationId);
    });
});
