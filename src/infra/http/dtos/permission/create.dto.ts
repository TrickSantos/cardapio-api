import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const createPermissionSchema = z.object({
    name: z.string().nonempty('Name is required'),
    description: z.string().nonempty('Description is required'),
    isActive: z.boolean().optional().default(true),
});

export class CreatePermissionDTO extends createZodDto(createPermissionSchema) {}
