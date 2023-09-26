import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const addUsersToRoleSchema = z.object({
    users: z
        .array(z.string().uuid('Invalid user id'))
        .min(1, 'At least one user is required'),
});

export class AddUsersToRoleDTO extends createZodDto(addUsersToRoleSchema) {}
