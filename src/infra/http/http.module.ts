import { Module } from '@nestjs/common';
import { CategoryUseCaseModule } from '@useCases/category/category.module';
import { OrganizationUseCaseModule } from '@useCases/organization/organization.module';
import { PlaceUseCaseModule } from '@useCases/place/place.module';
import { PriceUseCaseModule } from '@useCases/price/price.module';
import { ProductUseCaseModule } from '@useCases/product/product.module';
import { UserUseCaseModule } from '@useCases/user/user.module';
import { CategoryController } from './controllers/category.controller';
import { OrganizationsController } from './controllers/organizations.controller';
import { PlacesController } from './controllers/place.controller';
import { PriceController } from './controllers/price.controller';
import { ProductsController } from './controllers/product.controller';
import { UsersController } from './controllers/users.controller';

@Module({
    controllers: [
        OrganizationsController,
        UsersController,
        PlacesController,
        CategoryController,
        ProductsController,
        PriceController,
    ],
    imports: [
        OrganizationUseCaseModule,
        UserUseCaseModule,
        PlaceUseCaseModule,
        CategoryUseCaseModule,
        ProductUseCaseModule,
        PriceUseCaseModule,
    ],
})
export class HttpModule {}
