import { CategoryRepository } from '@domain/repositories/category.repository';
import { MenuRepository } from '@domain/repositories/menu.repository';
import { OrganizationRepository } from '@domain/repositories/organization.repository';
import { PlaceRepository } from '@domain/repositories/place.repository';
import { ProductRepository } from '@domain/repositories/product.repository';
import { SectionRepository } from '@domain/repositories/section.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { Module } from '@nestjs/common';
import { InMemoryCategoryRepository } from './inMemory/category.repository';
import { InMemoryMenuRepository } from './inMemory/menu.repository';
import { InMemoryOrganizationRepository } from './inMemory/organization.repository';
import { InMemoryPlaceRepository } from './inMemory/place.repository';
import { InMemoryProductRepository } from './inMemory/product.repository';
import { InMemorySectionRepository } from './inMemory/section.repository';
import { InMemoryUserRepository } from './inMemory/user.repository';
import { PrismaCategoryRepository } from './prisma/category.repository';
import { PrismaMenuRepository } from './prisma/menu.repository';
import { PrismaOrganizationRepository } from './prisma/organization.repository';
import { PrismaPlaceRepository } from './prisma/place.repository';
import { PrismaProductRepository } from './prisma/product.repository';
import { PrismaSectionRepository } from './prisma/section.repository';
import { PrismaUserRepository } from './prisma/user.repository';

@Module({
    providers: [
        {
            provide: OrganizationRepository,
            useClass:
                process.env.NODE_ENV === 'test'
                    ? InMemoryOrganizationRepository
                    : PrismaOrganizationRepository,
        },
        {
            provide: UserRepository,
            useClass:
                process.env.NODE_ENV === 'test'
                    ? InMemoryUserRepository
                    : PrismaUserRepository,
        },
        {
            provide: PlaceRepository,
            useClass:
                process.env.NODE_ENV === 'test'
                    ? InMemoryPlaceRepository
                    : PrismaPlaceRepository,
        },
        {
            provide: ProductRepository,
            useClass:
                process.env.NODE_ENV === 'test'
                    ? InMemoryProductRepository
                    : PrismaProductRepository,
        },
        {
            provide: CategoryRepository,
            useClass:
                process.env.NODE_ENV === 'test'
                    ? InMemoryCategoryRepository
                    : PrismaCategoryRepository,
        },
        {
            provide: MenuRepository,
            useClass:
                process.env.NODE_ENV === 'test'
                    ? InMemoryMenuRepository
                    : PrismaMenuRepository,
        },
        {
            provide: SectionRepository,
            useClass:
                process.env.NODE_ENV === 'test'
                    ? InMemorySectionRepository
                    : PrismaSectionRepository,
        },
    ],
    exports: [
        OrganizationRepository,
        UserRepository,
        PlaceRepository,
        ProductRepository,
        CategoryRepository,
        MenuRepository,
        SectionRepository,
    ],
})
export class DatabaseModule {}
