import { createZodDto } from '@anatine/zod-nestjs';
import { createPriceSchema } from './create.dto';

export class UpdatePriceDTO extends createZodDto(createPriceSchema.partial()) {}
