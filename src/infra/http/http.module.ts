import { Module } from '@nestjs/common';
import { CategoryUseCaseModule } from '@useCases/category/category.module';
import { MenuUseCaseModule } from '@useCases/menu/menu.module';
import { OrganizationUseCaseModule } from '@useCases/organization/organization.module';
import { PlaceUseCaseModule } from '@useCases/place/place.module';
import { PriceUseCaseModule } from '@useCases/price/price.module';
import { ProductUseCaseModule } from '@useCases/product/product.module';
import { SectionUseCaseModule } from '@useCases/section/section.module';
import { UserUseCaseModule } from '@useCases/user/user.module';
import { CategoryController } from './controllers/category.controller';
import { MenuController } from './controllers/menu.controller';
import { OrganizationsController } from './controllers/organizations.controller';
import { PlacesController } from './controllers/place.controller';
import { PriceController } from './controllers/price.controller';
import { ProductsController } from './controllers/product.controller';
import { SectionController } from './controllers/section.controller';
import { UsersController } from './controllers/users.controller';
import { SupabaseModule } from '@infra/uploads/supabase/supabase.module';
import { RoleController } from './controllers/role.controller';
import { RoleUseCaseModule } from '@useCases/role/role.module';
import { PermissionUseCaseModule } from '@useCases/permission/permission.module';
import { PermissionController } from './controllers/permission.controller';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthModule } from '@useCases/authentication/authentication.module';

@Module({
    controllers: [
        AuthenticationController,
        OrganizationsController,
        UsersController,
        PlacesController,
        CategoryController,
        ProductsController,
        PriceController,
        MenuController,
        SectionController,
        RoleController,
        PermissionController,
    ],
    imports: [
        AuthModule,
        OrganizationUseCaseModule,
        UserUseCaseModule,
        PlaceUseCaseModule,
        CategoryUseCaseModule,
        ProductUseCaseModule,
        PriceUseCaseModule,
        MenuUseCaseModule,
        SectionUseCaseModule,
        SupabaseModule,
        RoleUseCaseModule,
        PermissionUseCaseModule,
    ],
})
export class HttpModule {}
