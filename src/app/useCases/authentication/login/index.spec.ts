import { User } from '@domain/entities/user/user';
import { JwtService } from '@nestjs/jwt';
import { describe, beforeAll, expect } from 'vitest';
import { LoginUseCase } from '.';
import { makeUser } from '@test/factories/user.factory';

describe('Login', () => {
    let user: User;

    const jwtService = new JwtService({
        secret: 'secret',
        signOptions: { expiresIn: '7 days' },
    });
    const useCase = new LoginUseCase(jwtService);

    beforeAll(async () => {
        user = await makeUser({
            password: 'secret123',
        });
    });

    it('should return a token', async () => {
        const result = await useCase.execute(user);
        expect(result.token).toBeDefined();
    });
});
