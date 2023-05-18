import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from './create';
import { DeleteCategoryUseCase } from './delete';
import { FindCategoryByIdUseCase } from './findById';
import { ListAllCategoriesUseCase } from './listAll';
import { UpdateCategoryUseCase } from './update';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreateCategoryUseCase,
        DeleteCategoryUseCase,
        FindCategoryByIdUseCase,
        ListAllCategoriesUseCase,
        UpdateCategoryUseCase,
    ],
    exports: [
        CreateCategoryUseCase,
        DeleteCategoryUseCase,
        FindCategoryByIdUseCase,
        ListAllCategoriesUseCase,
        UpdateCategoryUseCase,
    ],
})
export class CategoryUseCaseModule {}
