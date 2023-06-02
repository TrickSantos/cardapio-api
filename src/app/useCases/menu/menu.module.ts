import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateMenuUseCase } from './create';
import { DeleteMenuUseCase } from './delete';
import { FindMenuByIdUseCase } from './findById';
import { ListAllMenusUseCase } from './listAll';
import { UpdateMenuUseCase } from './update';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreateMenuUseCase,
        DeleteMenuUseCase,
        FindMenuByIdUseCase,
        ListAllMenusUseCase,
        UpdateMenuUseCase,
    ],
    exports: [
        CreateMenuUseCase,
        DeleteMenuUseCase,
        FindMenuByIdUseCase,
        ListAllMenusUseCase,
        UpdateMenuUseCase,
    ],
})
export class MenuUseCaseModule {}
