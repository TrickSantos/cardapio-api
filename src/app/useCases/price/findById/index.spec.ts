import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { InMemoryPriceRepository } from '@infra/database/inMemory/price.repository';
import { PriceNotFound } from '@useCases/errors/PriceNotFound';
import { Price } from '@domain/entities/place/price/price';
import { makePrice } from '@test/factories/price.factory';
import { FindPriceByIdUseCase } from '.';

describe('FindPriceById', () => {
    let price: Price;
    const repository = new InMemoryPriceRepository();
    const useCase = new FindPriceByIdUseCase(repository);

    beforeEach(() => {
        price = makePrice();
        repository.create(price);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should find a price by id', async () => {
        const response = await useCase.execute(price.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(price.id);
        expect(response.value).toEqual(price.value);
    });

    it('should throw an error if price not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            PriceNotFound,
        );
    });
});
