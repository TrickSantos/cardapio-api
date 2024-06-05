import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './login';
import { ValidateUseCase } from './validate';

@Module({
    imports: [
        DatabaseModule,
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
