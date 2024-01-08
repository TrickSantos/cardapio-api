import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './login';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { ValidateUseCase } from './validate';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_SEED,
            signOptions: { expiresIn: '7 days' },
        }),
    ],
    providers: [LoginUseCase, ValidateUseCase, LocalStrategy, JwtStrategy],
    exports: [LoginUseCase, ValidateUseCase],
})
export class AuthModule {}
