import { createZodDto } from '@anatine/zod-nestjs';
import { CreateCategorySchema } from './create.dto';

export class UpdateCategoryDTO extends createZodDto(
    CreateCategorySchema.partial(),
) {}
