import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreatePriceUseCase } from './create';
import { DeletePriceUseCase } from './delete';
import { FindPriceByIdUseCase } from './findById';
import { ListAllPricesUseCase } from './listAll';
import { UpdatePriceUseCase } from './update';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreatePriceUseCase,
        DeletePriceUseCase,
        FindPriceByIdUseCase,
        ListAllPricesUseCase,
        UpdatePriceUseCase,
    ],
    exports: [
        CreatePriceUseCase,
        DeletePriceUseCase,
        FindPriceByIdUseCase,
        ListAllPricesUseCase,
        UpdatePriceUseCase,
    ],
})
export class PriceUseCaseModule {}
