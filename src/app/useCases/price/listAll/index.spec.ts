import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { InMemoryPriceRepository } from '@infra/database/inMemory/price.repository';
import { Price } from '@domain/entities/place/price/price';
import { makePrice } from '@test/factories/price.factory';
import { ListAllPricesUseCase } from '.';

describe('List All Prices', () => {
    let price: Price;
    const repository = new InMemoryPriceRepository();
    const useCase = new ListAllPricesUseCase(repository);

    beforeEach(() => {
        Array.from({ length: 10 }).forEach(() => {
            price = makePrice();
            repository.create(price);
        });
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all categories', async () => {
        const response = await useCase.execute();
        expect(response).toHaveLength(10);
    });
});
