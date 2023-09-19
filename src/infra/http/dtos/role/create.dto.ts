import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const createRoleSchema = z.object({
    name: z.string().nonempty('Name is required'),
    isActive: z.boolean().optional().default(true),
});

export class CreateRoleDTO extends createZodDto(createRoleSchema) {}
