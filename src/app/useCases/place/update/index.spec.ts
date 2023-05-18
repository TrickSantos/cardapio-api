import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { Place } from '@domain/entities/place/place';
import { InMemoryPlaceRepository } from '@infra/database/inMemory/place.repository';
import { makePlace } from '@test/factories/place.factory';
import { PlaceNotFound } from '@useCases/errors/PlaceNotFound';
import { UpdatePlaceUseCase } from '.';

describe('Update Place', () => {
    let place: Place;
    const repository = new InMemoryPlaceRepository();
    const useCase = new UpdatePlaceUseCase(repository);

    beforeEach(() => {
        place = makePlace();
        repository.create(place);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should update a place', async () => {
        const updatedPlace = makePlace();
        await useCase.execute({
            id: place.id,
            organizationId: updatedPlace.organizationId,
            name: updatedPlace.name,
            address: updatedPlace.address,
        });
        const user = await repository.findById(place.id);
        expect(user).toBeDefined();
        expect(user?.name).toEqual(updatedPlace.name);
        expect(user?.organizationId).toEqual(updatedPlace.organizationId);
        expect(user?.address).toEqual(updatedPlace.address);
    });

    it('should throw an error if user not found', async () => {
        await expect(
            useCase.execute({ ...makePlace(), id: 'invalid-id' }),
        ).rejects.toThrow(PlaceNotFound);
    });
});
