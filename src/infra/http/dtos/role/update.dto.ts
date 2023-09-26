import { createZodDto } from '@anatine/zod-nestjs';
import { createRoleSchema } from './create.dto';

export class UpdateRoleDTO extends createZodDto(createRoleSchema.partial()) {}
