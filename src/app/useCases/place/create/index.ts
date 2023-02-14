import { Place } from '@domain/entities/place/place';
import { PlaceRepository } from '@domain/repositories/place.repository';
import { Injectable } from '@nestjs/common';

type CreatePlaceDTO = {
    organizationId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    website: string;
};

@Injectable()
export class CreatePlaceUseCase {
    constructor(private placeRepository: PlaceRepository) {}

    async execute(data: CreatePlaceDTO): Promise<void> {
        const place = new Place({
            organizationId: data.organizationId,
            name: data.name,
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
            phone: data.phone,
            website: data.website,
            isActive: true,
        });

        return this.placeRepository.create(place);
    }
}
