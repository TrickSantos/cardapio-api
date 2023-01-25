import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { Module } from '@nestjs/common';
import { OrganizationInMemoryRepository } from './inMemory/organization.repository';

@Module({
    providers: [
        {
            provide: OrganizationRepository,
            useClass: OrganizationInMemoryRepository,
        },
    ],
    exports: [OrganizationRepository],
})
export class DatabaseModule {}
