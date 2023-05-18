import { PlaceRepository } from '@domain/repositories/place.repository';
import { Injectable } from '@nestjs/common';
import { makePlace } from '@test/factories/place.factory';

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
        const place = makePlace({
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
