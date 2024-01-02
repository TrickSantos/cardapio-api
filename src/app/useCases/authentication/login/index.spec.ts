import { User } from '@domain/entities/user/user';
import { InMemoryUserRepository } from '@infra/database/inMemory/user.repository';
import { JwtService } from '@nestjs/jwt';
import { describe, beforeAll, afterAll, expect } from 'vitest';
import { LoginUseCase } from '.';
import { makeUser } from '@test/factories/user.factory';
import { UnauthorizedException } from '@nestjs/common';

describe('Login', () => {
    let user: User;

    const repository = new InMemoryUserRepository();
    const jwtService = new JwtService({
        secret: 'secret',
        signOptions: { expiresIn: '7 days' },
    });
    const useCase = new LoginUseCase(repository, jwtService);

    beforeAll(async () => {
        user = await makeUser({
            password: 'secret123',
        });
        repository.create(user);
    });

    afterAll(() => {
        repository.reset();
    });

    it('should return a token', async () => {
        const result = await useCase.execute(user.email, 'secret123');
        expect(result.token).toBeDefined();
    });

    it('should throw an error if user is not found', async () => {
        await expect(useCase.execute('invalid', 'invalid')).rejects.toThrow(
            UnauthorizedException,
        );
    });

    it('should throw an error if password is invalid', async () => {
        await expect(useCase.execute(user.email, 'invalid')).rejects.toThrow(
            UnauthorizedException,
        );
    });
});
