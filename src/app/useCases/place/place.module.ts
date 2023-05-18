import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreatePlaceUseCase } from './create';
import { DeletePlaceUseCase } from './delete';
import { FindPlaceByIdUseCase } from './findById';
import { ListAllPlacesUseCase } from './listAll';
import { UpdatePlaceUseCase } from './update';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreatePlaceUseCase,
        DeletePlaceUseCase,
        FindPlaceByIdUseCase,
        ListAllPlacesUseCase,
        UpdatePlaceUseCase,
    ],
    exports: [
        CreatePlaceUseCase,
        DeletePlaceUseCase,
        FindPlaceByIdUseCase,
        ListAllPlacesUseCase,
        UpdatePlaceUseCase,
    ],
})
export class PlaceUseCaseModule {}
