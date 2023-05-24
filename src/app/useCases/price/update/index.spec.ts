import { Price } from '@domain/entities/place/price/price';
import { InMemoryPriceRepository } from '@infra/database/inMemory/price.repository';
import { makePrice } from '@test/factories/price.factory';
import { PriceNotFound } from '@useCases/errors/PriceNotFound';
import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { UpdatePriceUseCase } from '.';

describe('Update Price', () => {
    let price: Price;
    const repository = new InMemoryPriceRepository();
    const useCase = new UpdatePriceUseCase(repository);

    beforeEach(() => {
        price = makePrice();
        repository.create(price);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should update a price', async () => {
        const updatedPrice = makePrice();
        await useCase.execute({
            id: price.id,
            value: updatedPrice.value,
        });
        const foundPrice = await repository.findById(price.id);
        expect(foundPrice).toBeDefined();
        expect(foundPrice?.value).toEqual(updatedPrice.value);
    });

    it('should throw an error if price not found', async () => {
        await expect(
            useCase.execute({ ...makePrice(), id: 'invalid-id' }),
        ).rejects.toThrow(PriceNotFound);
    });
});
