import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './create';
import { DeleteProductUseCase } from './delete';
import { FindProductByIdUseCase } from './findById';
import { ListAllProductsUseCase } from './listAll';
import { UpdateProductUseCase } from './update';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreateProductUseCase,
        DeleteProductUseCase,
        FindProductByIdUseCase,
        ListAllProductsUseCase,
        UpdateProductUseCase,
    ],
    exports: [
        CreateProductUseCase,
        DeleteProductUseCase,
        FindProductByIdUseCase,
        ListAllProductsUseCase,
        UpdateProductUseCase,
    ],
})
export class ProductUseCaseModule {}
