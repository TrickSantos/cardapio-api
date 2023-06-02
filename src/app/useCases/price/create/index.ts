import { Price } from '@domain/entities/place/price/price';
import { PriceRepository } from '@domain/repositories/price.repository';
import { Injectable } from '@nestjs/common';

type CreatePriceDTO = {
    productId: string;
    value: number;
};

@Injectable()
export class CreatePriceUseCase {
    constructor(private priceRepository: PriceRepository) {}

    async execute(data: CreatePriceDTO): Promise<void> {
        const price = new Price({
            productId: data.productId,
            value: data.value,
            isActive: true,
        });

        return this.priceRepository.create(price);
    }
}
