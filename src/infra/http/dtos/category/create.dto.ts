import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const CreateCategorySchema = z.object({
    name: z.string().nonempty('Name is required'),
    placeId: z
        .string()
        .uuid({
            message: 'PlaceId must be a valid UUID',
        })
        .nonempty('PlaceId is required'),
    isActive: z.boolean().optional().default(true),
});

export class CreateCategoryDTO extends createZodDto(CreateCategorySchema) {}
