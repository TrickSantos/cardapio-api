import { PlaceRepository } from '@domain/repositories/place.repository';
import { Injectable } from '@nestjs/common';
import { PlaceNotFound } from '@useCases/errors/PlaceNotFound';

@Injectable()
export class DeletePlaceUseCase {
    constructor(private placeRepository: PlaceRepository) {}

    async execute(id: string) {
        const place = await this.placeRepository.findById(id);
        if (place) {
            return this.placeRepository.delete(id);
        } else {
            throw new PlaceNotFound();
        }
    }
}
