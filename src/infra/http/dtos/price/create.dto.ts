import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const createPriceSchema = z.object({
    value: z.number().min(0.01, 'Price must be greater than 0.01'),
    productId: z
        .string()
        .uuid({
            message: 'PlaceId must be a valid UUID',
        })
        .nonempty('PlaceId is required'),
});

export class CreatePriceDTO extends createZodDto(createPriceSchema) {}
