import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const createRoleSchema = z.object({
    name: z.string().nonempty('Name is required'),
    description: z.string().nonempty('Description is required'),
    isActive: z.boolean().optional().default(true),
    permissions: z
        .array(z.string().uuid())
        .min(1, 'At least one permission is required'),
});

export class CreateRoleDTO extends createZodDto(createRoleSchema) {}
