import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateSectionUseCase } from './create';
import { DeleteSectionUseCase } from './delete';
import { FindSectionByIdUseCase } from './findById';
import { ListAllSectionsUseCase } from './listAll';
import { UpdateSectionUseCase } from './update';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreateSectionUseCase,
        DeleteSectionUseCase,
        FindSectionByIdUseCase,
        ListAllSectionsUseCase,
        UpdateSectionUseCase,
    ],
    exports: [
        CreateSectionUseCase,
        DeleteSectionUseCase,
        FindSectionByIdUseCase,
        ListAllSectionsUseCase,
        UpdateSectionUseCase,
    ],
})
export class SectionUseCaseModule {}
