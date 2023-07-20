import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const listAllCategorieschema = z.object({
    isActive: z
        .string()
        .optional()
        .transform((val) => (val === 'true' ? true : false)),
});

export class ListAllCategoriesDTO extends createZodDto(
    listAllCategorieschema,
) {}
