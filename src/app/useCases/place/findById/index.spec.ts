import { Place } from '@domain/entities/place/place';
import { InMemoryPlaceRepository } from '@infra/database/inMemory/place.repository';
import { makePlace } from '@test/factories/place.factory';
import { PlaceNotFound } from '@useCases/errors/PlaceNotFound';
import { FindPlaceByIdUseCase } from '.';

describe('FindPlaceById', () => {
    let place: Place;
    const repository = new InMemoryPlaceRepository();
    const useCase = new FindPlaceByIdUseCase(repository);

    beforeEach(() => {
        place = makePlace();
        repository.create(place);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should find a place by id', async () => {
        const response = await useCase.execute(place.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(place.id);
        expect(response.name).toEqual(place.name);
        expect(response.address).toEqual(place.address);
    });

    it('should throw an error if place not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            PlaceNotFound,
        );
    });
});
