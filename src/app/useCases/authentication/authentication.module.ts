import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './login';
import { ValidateUseCase } from './validate';
import { UserUseCaseModule } from '@useCases/user/user.module';

@Module({
    imports: [
        UserUseCaseModule,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_SEED,
            signOptions: { expiresIn: '7 days' },
        }),
    ],
    providers: [LoginUseCase, ValidateUseCase],
    exports: [LoginUseCase, ValidateUseCase],
})
export class AuthModule {}
