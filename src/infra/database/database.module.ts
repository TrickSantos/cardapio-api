import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { Module } from '@nestjs/common';
import { OrganizationInMemoryRepository } from './inMemory/organization.repository';
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
    ],
    exports: [OrganizationRepository, UserRepository],
})
export class DatabaseModule {}
