import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const createOrganizationSchema = z.object({
    name: z.string().nonempty('Name is required'),
    logo: z.string().url({
        message: 'Logo must be a valid URL',
    }),
});

export class CreateOrganizationDTO extends createZodDto(
    createOrganizationSchema,
) {}
