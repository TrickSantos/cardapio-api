import { createZodDto } from '@anatine/zod-nestjs';
import { createSectionSchema } from './create.dto';

export class UpdateSectionDTO extends createZodDto(
    createSectionSchema.partial(),
) {}
