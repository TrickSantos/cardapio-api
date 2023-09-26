import { createZodDto } from '@anatine/zod-nestjs';
import { createPermissionSchema } from './create.dto';

export class UpdatePermissionDTO extends createZodDto(
    createPermissionSchema.partial(),
) {}
