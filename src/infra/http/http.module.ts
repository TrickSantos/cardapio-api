import { Module } from '@nestjs/common';
import { CategoryUseCaseModule } from '@useCases/category/category.module';
import { OrganizationUseCaseModule } from '@useCases/organization/organization.module';
import { PlaceUseCaseModule } from '@useCases/place/place.module';
import { ProductUseCaseModule } from '@useCases/product/product.module';
import { UserUseCaseModule } from '@useCases/user/user.module';
import { CategoryController } from './controllers/category.controller';
import { OrganizationsController } from './controllers/organizations.controller';
import { PlacesController } from './controllers/place.controller';
import { ProductsController } from './controllers/product.controller';
import { UsersController } from './controllers/users.controller';

@Module({
    controllers: [
        OrganizationsController,
        UsersController,
        PlacesController,
        CategoryController,
        ProductsController,
    ],
    imports: [
        OrganizationUseCaseModule,
        UserUseCaseModule,
        PlaceUseCaseModule,
        CategoryUseCaseModule,
        ProductUseCaseModule,
    ],
})
export class HttpModule {}
