import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const listAllUsersSchema = z.object({
    organizationId: z.string().uuid().optional(),
    limit: z.number().int().min(1).max(100).optional(),
    offset: z.number().int().min(0).optional(),
});

export class listAllUsersDTO extends createZodDto(listAllUsersSchema) {}
