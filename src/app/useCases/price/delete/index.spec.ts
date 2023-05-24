import { Price } from '@domain/entities/place/price/price';
import { InMemoryPriceRepository } from '@infra/database/inMemory/price.repository';
import { makePrice } from '@test/factories/price.factory';
import { PriceNotFound } from '@useCases/errors/PriceNotFound';
import { describe, afterEach, it, expect } from 'vitest';
import { DeletePriceUseCase } from '.';

describe('Delete Price', () => {
    let price: Price;
    const repository = new InMemoryPriceRepository();
    const useCase = new DeletePriceUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should delete a price', async () => {
        price = makePrice();
        await repository.create(price);
        await useCase.execute(price.id);
        const prices = await repository.findAll();
        expect(prices).toHaveLength(0);
    });

    it('should throw an error if price not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            PriceNotFound,
        );
    });
});
