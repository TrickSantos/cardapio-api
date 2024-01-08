import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const CreateUserSchema = z.object({
    organizationId: z.string({ required_error: 'OrganizationId is required' }),
    username: z.string({ required_error: 'Username is required' }),
    password: z.string({ required_error: 'Password is required' }),
    email: z
        .string({ required_error: 'Email is required' })
        .email('Email is required')
        .transform((data) => data.toLocaleLowerCase()),
    isActive: z.boolean().default(true),
    permissions: z.array(z.string()).optional(),
    roles: z.array(z.string()),
    contact: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z
            .string()
            .email('Email is required')
            .transform((data) => data.toLocaleLowerCase()),
        phone: z.string(),
    }),
});

export class CreateUserDTO extends createZodDto(CreateUserSchema) {}
