import { PriceRepository } from '@domain/repositories/price.repository';
import { Injectable } from '@nestjs/common';
import { PriceNotFound } from '@useCases/errors/PriceNotFound';

@Injectable()
export class DeletePriceUseCase {
    constructor(private priceRepository: PriceRepository) {}

    async execute(id: string) {
        const place = await this.priceRepository.findById(id);
        if (place) {
            return this.priceRepository.delete(id);
        } else {
            throw new PriceNotFound();
        }
    }
}
