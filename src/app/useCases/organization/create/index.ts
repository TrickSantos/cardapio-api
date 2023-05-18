import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { Injectable } from '@nestjs/common';
import { makeOrganization } from '@test/factories/organization.factory';

type CreateOrganizationDTO = {
    name: string;
    logo: string;
};

@Injectable()
export class CreateOrganizationUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute(data: CreateOrganizationDTO): Promise<void> {
        const organization = makeOrganization({
            name: data.name,
            logo: data.logo,
            isActive: true,
        });

        return this.organizationRepository.create(organization);
    }
}
