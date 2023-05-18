import { createZodDto } from '@anatine/zod-nestjs';
import { createOrganizationSchema } from './create.dto';

export class UpdateOrganizationDTO extends createZodDto(
    createOrganizationSchema.partial(),
) {}
