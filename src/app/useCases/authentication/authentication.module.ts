import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './login';

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_SEED,
            signOptions: { expiresIn: '7 days' },
        }),
    ],
    providers: [LoginUseCase],
    exports: [LoginUseCase],
})
export class AuthModule {}
