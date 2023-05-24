import { describe, afterEach, it, expect } from 'vitest';
import { Price } from '@domain/entities/place/price/price';
import { InMemoryPriceRepository } from '@infra/database/inMemory/price.repository';
import { makePrice } from '@test/factories/price.factory';
import { CreatePriceUseCase } from '.';

describe('Create Price', () => {
    let price: Price;
    const repository = new InMemoryPriceRepository();
    const useCase = new CreatePriceUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a price', async () => {
        price = makePrice();
        await useCase.execute(price);
        const prices = await repository.findAll();
        expect(prices).toHaveLength(1);
        expect(prices[0].value).toEqual(price.value);
    });
});
