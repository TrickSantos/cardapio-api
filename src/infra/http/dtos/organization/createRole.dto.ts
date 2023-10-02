import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const createOrganizationRoleSchema = z.object({
    name: z.string().nonempty('Name is required'),
    description: z.string(),
    permissions: z.array(z.string().uuid('PermissionId is required')),
});

export class CreateOrganizationRoleDTO extends createZodDto(
    createOrganizationRoleSchema,
) {}
