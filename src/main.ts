import { NestFactory } from '@nestjs/core';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import multipart from '@fastify/multipart';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    // app.register(multipart, { addToBody: true });

    app.enableCors({
        origin: '*',
    });

    app.useGlobalPipes(new ZodValidationPipe());

    await app.listen(3000, '0.0.0.0');
}
bootstrap();
