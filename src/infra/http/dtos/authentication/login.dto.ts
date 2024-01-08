import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const loginSchema = z
    .object({
        email: z.string().email('Email is required'),
        password: z.string().min(1, 'Password is required'),
    })
    .transform((data) => ({
        email: data.email.toLocaleLowerCase(),
        password: data.password,
    }));

export class LoginDTO extends createZodDto(loginSchema) {}
