import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const createMenuSchema = z.object({
    placeId: z.string({ required_error: 'placeId is required' }),
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
});

export class CreateMenuDTO extends createZodDto(createMenuSchema) {}
