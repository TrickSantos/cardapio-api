import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { PlaceRepository } from '@domain/repositories/place.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { Module } from '@nestjs/common';
import { OrganizationInMemoryRepository } from './inMemory/organization.repository';
import { InMemoryPlaceRepository } from './inMemory/place.repository';
import { InMemoryUserRepository } from './inMemory/user.repository';

@Module({
    providers: [
        {
            provide: OrganizationRepository,
            useClass: OrganizationInMemoryRepository,
        },
        {
            provide: UserRepository,
            useClass: InMemoryUserRepository,
        },
        {
            provide: PlaceRepository,
            useClass: InMemoryPlaceRepository,
        },
    ],
    exports: [OrganizationRepository, UserRepository, PlaceRepository],
})
export class DatabaseModule {}
