import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const createSectionSchema = z.object({
    menuId: z.string({ required_error: 'menuId is required' }),
    categoryId: z.string({ required_error: 'categoryId is required' }),
    name: z.string({ required_error: 'Name is required' }),
});

export class CreateSectionDTO extends createZodDto(createSectionSchema) {}
