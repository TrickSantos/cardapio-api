import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const createMenuSchema = z.object({
    placeId: z.string({ required_error: 'placeId is required' }),
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    sections: z
        .array(
            z.object({
                name: z.string({ required_error: 'Section name is required' }),
                categoryId: z.string({
                    required_error: 'Category is required',
                }),
            }),
        )
        .min(1, 'At least one section is required'),
});

export class CreateMenuDTO extends createZodDto(createMenuSchema) {}
