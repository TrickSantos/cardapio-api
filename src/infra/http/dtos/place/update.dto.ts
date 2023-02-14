import { createZodDto } from '@anatine/zod-nestjs';
import { CreatePlaceSchema } from './create.dto';

export class UpdatePlaceDTO extends createZodDto(CreatePlaceSchema.partial()) {}
