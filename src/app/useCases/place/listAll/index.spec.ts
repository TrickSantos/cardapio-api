import { Place } from '@domain/entities/place/place';
import { InMemoryPlaceRepository } from '@infra/database/inMemory/place.repository';
import { makePlace } from '@test/factories/place.factory';
import { ListAllPlacesUseCase } from '.';

describe('List All Places', () => {
    let place: Place;
    const repository = new InMemoryPlaceRepository();
    const useCase = new ListAllPlacesUseCase(repository);

    beforeEach(() => {
        Array.from({ length: 10 }).forEach(() => {
            place = makePlace();
            repository.create(place);
        });
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all places', async () => {
        const response = await useCase.execute();
        expect(response).toHaveLength(10);
    });
});
