import { createZodDto } from '@anatine/zod-nestjs';
import { CreateUserSchema } from './create.dto';

export class UpdateUserDto extends createZodDto(
    CreateUserSchema.omit({
        contact: true,
        permissions: true,
        roles: true,
        organizationId: true,
    }),
) {}
