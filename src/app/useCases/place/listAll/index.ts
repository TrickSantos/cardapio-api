import { Place } from '@domain/entities/place/place';
import { PlaceRepository } from '@domain/repositories/place.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllPlacesUseCase {
    constructor(private placeRepository: PlaceRepository) {}

    async execute(): Promise<Place[]> {
        return this.placeRepository.findAll();
    }
}
