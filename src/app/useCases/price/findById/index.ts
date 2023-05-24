import { Price } from '@domain/entities/place/price/price';
import { PriceRepository } from '@domain/repositories/price.repository';
import { Injectable } from '@nestjs/common';
import { PriceNotFound } from '@useCases/errors/PriceNotFound';

@Injectable()
export class FindPriceByIdUseCase {
    constructor(private readonly priceRepository: PriceRepository) {}

    async execute(id: string): Promise<Price> {
        const price = await this.priceRepository.findById(id);
        if (price) {
            return price;
        } else {
            throw new PriceNotFound();
        }
    }
}
