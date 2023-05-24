import { PriceRepository } from '@domain/repositories/price.repository';
import { Injectable } from '@nestjs/common';
import { PriceNotFound } from '@useCases/errors/PriceNotFound';

type UpdatePriceDTO = {
    id: string;
    placeId?: string;
    productId?: string;
    value?: number;
    isActive?: boolean;
};

@Injectable()
export class UpdatePriceUseCase {
    constructor(private priceRepository: PriceRepository) {}

    async execute(data: UpdatePriceDTO) {
        const price = await this.priceRepository.findById(data.id);
        if (price) {
            price.update({
                ...data,
            });
            return this.priceRepository.update(price);
        } else {
            throw new PriceNotFound();
        }
    }
}
