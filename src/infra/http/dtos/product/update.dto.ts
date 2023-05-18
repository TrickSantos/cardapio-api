import { createZodDto } from '@anatine/zod-nestjs';
import { createProductSchema } from './create.dto';

export class UpdateProductDTO extends createZodDto(
    createProductSchema.partial(),
) {}
