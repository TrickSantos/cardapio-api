import { CategoryRepository } from '@domain/repositories/category.repository';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { PlaceRepository } from '@domain/repositories/place.repository';
import { ProductRepository } from '@domain/repositories/product.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { Module } from '@nestjs/common';
import { InMemoryCategoryRepository } from './inMemory/category.repository';
import { OrganizationInMemoryRepository } from './inMemory/organization.repository';
import { InMemoryPlaceRepository } from './inMemory/place.repository';
import { InMemoryProductRepository } from './inMemory/product.repository';
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
        {
            provide: ProductRepository,
            useClass: InMemoryProductRepository,
        },
        {
            provide: CategoryRepository,
            useClass: InMemoryCategoryRepository,
        },
    ],
    exports: [
        OrganizationRepository,
        UserRepository,
        PlaceRepository,
        ProductRepository,
        CategoryRepository,
    ],
})
export class DatabaseModule {}
