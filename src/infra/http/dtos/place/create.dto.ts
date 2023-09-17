import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const CreatePlaceSchema = z.object({
    organizationId: z.string({ required_error: 'OrganizationId is required' }),
    name: z.string({ required_error: 'Name is required' }),
    address: z.string({ required_error: 'Address is required' }),
    city: z.string({ required_error: 'City is required' }),
    state: z.string({ required_error: 'State is required' }),
    zip: z
        .string({ required_error: 'Zip is required' })
        .length(9, { message: 'Zip must be 9 characters' }),
    phone: z.string({ required_error: 'Phone is required' }),
    website: z.string({ required_error: 'Website is required' }).url({
        message: 'Website must be a valid URL',
    }),
});

export class CreatePlaceDTO extends createZodDto(CreatePlaceSchema) {}
