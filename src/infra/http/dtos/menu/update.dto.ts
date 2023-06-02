import { createZodDto } from '@anatine/zod-nestjs';
import { createMenuSchema } from './create.dto';

export class UpdateMenuDTO extends createZodDto(createMenuSchema.partial()) {}
