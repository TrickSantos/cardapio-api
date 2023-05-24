import { Price } from '@domain/entities/place/price/price';
import { PriceRepository } from '@domain/repositories/price.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllPricesUseCase {
    constructor(private priceRepository: PriceRepository) {}

    async execute(): Promise<Price[]> {
        return this.priceRepository.findAll();
    }
}
