import { Place } from '@domain/entities/place/place';
import { InMemoryPlaceRepository } from '@infra/database/inMemory/place.repository';
import { makePlace } from '@test/factories/place.factory';
import { PlaceNotFound } from '@useCases/errors/PlaceNotFound';
import { DeletePlaceUseCase } from '.';

describe('Delete Place', () => {
    let place: Place;
    const repository = new InMemoryPlaceRepository();
    const useCase = new DeletePlaceUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should delete a place', async () => {
        place = makePlace();
        await repository.create(place);
        await useCase.execute(place.id);
        const places = await repository.findAll();
        expect(places).toHaveLength(0);
    });

    it('should throw an error if place not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            PlaceNotFound,
        );
    });
});
