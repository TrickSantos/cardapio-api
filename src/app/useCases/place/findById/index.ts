import { Place } from '@domain/entities/place/place';
import { PlaceRepository } from '@domain/repositories/place.repository';
import { Injectable } from '@nestjs/common';
import { PlaceNotFound } from '@useCases/errors/PlaceNotFound';

@Injectable()
export class FindPlaceByIdUseCase {
    constructor(private readonly placeRepository: PlaceRepository) {}

    async execute(id: string): Promise<Place> {
        const user = await this.placeRepository.findById(id);
        if (user) {
            return user;
        } else {
            throw new PlaceNotFound();
        }
    }
}
