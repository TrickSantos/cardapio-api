import { NestFactory } from '@nestjs/core';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    app.useGlobalPipes(new ZodValidationPipe());

    await app.listen(3000, '0.0.0.0');
}
bootstrap();
