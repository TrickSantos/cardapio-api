import { Place } from '@domain/entities/place/place';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { Injectable } from '@nestjs/common';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';

@Injectable()
export class FindAllPlacesUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(id: string): Promise<Place[]> {
        const response = await this.organizationRepository.findAllPlaces(id);
        if (response) {
            return response;
        } else {
            throw new OrganizationNotFound();
        }
    }
}
