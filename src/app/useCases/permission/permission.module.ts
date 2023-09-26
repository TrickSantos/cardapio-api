import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreatePermissionUseCase } from './create';
import { DeletePermissionUseCase } from './delete';
import { FindPermissionByIdUseCase } from './findById';
import { ListAllPermissionsUseCase } from './listAll';
import { UpdatePermissionUseCase } from './update';

@Module({
    imports: [DatabaseModule],
    providers: [
        CreatePermissionUseCase,
        DeletePermissionUseCase,
        FindPermissionByIdUseCase,
        ListAllPermissionsUseCase,
        UpdatePermissionUseCase,
    ],
    exports: [
        CreatePermissionUseCase,
        DeletePermissionUseCase,
        FindPermissionByIdUseCase,
        ListAllPermissionsUseCase,
        UpdatePermissionUseCase,
    ],
})
export class PermissionUseCaseModule {}
