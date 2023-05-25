import { PriceRepository } from '@domain/repositories/price.repository';
import { Injectable } from '@nestjs/common';
import { makePrice } from '@test/factories/price.factory';

type CreatePriceDTO = {
    productId: string;
    value: number;
};

@Injectable()
export class CreatePriceUseCase {
    constructor(private priceRepository: PriceRepository) {}

    async execute(data: CreatePriceDTO): Promise<void> {
        const price = makePrice({
            productId: data.productId,
            value: data.value,
        });

        return this.priceRepository.create(price);
    }
}
