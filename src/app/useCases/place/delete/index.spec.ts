import { InMemoryPlaceRepository } from '@infra/database/inMemory/place.repository';
import { makePlace } from '@test/factories/place.factory';
import { PlaceNotFound } from '@useCases/errors/PlaceNotFound';
import { DeletePlaceUseCase } from '.';
import { afterAll, describe, it } from 'vitest';

describe('Delete Place', () => {
    const place = makePlace();
    const repository = new InMemoryPlaceRepository();
    const useCase = new DeletePlaceUseCase(repository);

    afterAll(() => {
        repository.reset();
    });

    it('should delete a place', async () => {
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
