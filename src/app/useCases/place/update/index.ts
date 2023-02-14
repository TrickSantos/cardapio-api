import { PlaceRepository } from '@domain/repositories/place.repository';
import { Injectable } from '@nestjs/common';
import { PlaceNotFound } from '@useCases/errors/PlaceNotFound';

type UpdatePlaceDTO = {
    id: string;
    organizationId?: string;
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    website?: string;
    isActive?: boolean;
};

@Injectable()
export class UpdatePlaceUseCase {
    constructor(private placeRepository: PlaceRepository) {}

    async execute(data: UpdatePlaceDTO) {
        const user = await this.placeRepository.findById(data.id);
        if (user) {
            user.update({
                ...data,
            });
            return this.placeRepository.update(user);
        } else {
            throw new PlaceNotFound();
        }
    }
}
