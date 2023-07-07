import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().nonempty('Name is required'),
    description: z.string().nonempty('Description is required'),
    categories: z.array(z.string().uuid()).nonempty('Categories is required'),
    photos: z.array(z.string().url()).nonempty('Photos is required'),
    price: z
        .number({
            invalid_type_error: 'Price must be a valid number',
        })
        .optional(),
    placeId: z
        .string()
        .uuid({
            message: 'PlaceId must be a valid UUID',
        })
        .nonempty('PlaceId is required'),
});

export class CreateProductDTO extends createZodDto(createProductSchema) {}
