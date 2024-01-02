import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Place } from '@domain/entities/place/place';
import { InMemoryPlaceRepository } from '@infra/database/inMemory/place.repository';
import { makePlace } from '@test/factories/place.factory';
import { PlaceNotFound } from '@useCases/errors/PlaceNotFound';
import { UpdatePlaceUseCase } from '.';

describe('Update Place', () => {
    let place: Place;
    const repository = new InMemoryPlaceRepository();
    const useCase = new UpdatePlaceUseCase(repository);

    beforeAll(() => {
        place = makePlace();
        repository.create(place);
    });

    afterAll(() => {
        repository.reset();
    });

    it('should update a place', async () => {
        await useCase.execute({
            id: place.id,
            name: 'updated name',
        });
        const user = await repository.findById(place.id);
        expect(user).toBeDefined();
        expect(user?.name).toEqual('updated name');
    });

    it('should throw an error if user not found', async () => {
        await expect(
            useCase.execute({ ...makePlace(), id: 'invalid-id' }),
        ).rejects.toThrow(PlaceNotFound);
    });
});
