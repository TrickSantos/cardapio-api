import { beforeAll, describe, it, expect, vi } from 'vitest';
import { Test } from '@nestjs/testing';

import { AuthenticationController } from './authentication.controller';
import { LoginUseCase } from '@useCases/authentication/login';
import { AuthModule } from '@useCases/authentication/authentication.module';
import { UnauthorizedException } from '@nestjs/common';

describe('Authentication Controller', () => {
    let controller: AuthenticationController;
    let loginUseCase: LoginUseCase;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthenticationController],
            imports: [AuthModule],
        }).compile();

        controller = module.get(AuthenticationController);
        loginUseCase = module.get(LoginUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call loginUseCase with correct params', async () => {
        const mock = vi.fn().mockImplementation(() => Promise.resolve());
        const spy = vi.spyOn(loginUseCase, 'execute');
        spy.mockImplementation(mock);

        await controller.login({
            email: 'any_email',
            password: 'any_password',
        });

        expect(spy).toHaveBeenCalledWith('any_email', 'any_password');
    });

    it('should throw if loginUseCase throws', async () => {
        const mock = vi.fn().mockImplementation(() => {
            throw new UnauthorizedException();
        });
        const spy = vi.spyOn(loginUseCase, 'execute');
        spy.mockImplementation(mock);

        await expect(
            controller.login({
                email: 'any_email',
                password: 'any_password',
            }),
        ).rejects.toThrow(UnauthorizedException);
    });
});
