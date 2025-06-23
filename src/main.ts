import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file


async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.setGlobalPrefix('api')
    app.use(cookieParser());

    // Pasang ValidationPipe secara global
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));

    const port = 3000;
    await app.listen(port);
    logger.log(`🚀 Application is running on: http://localhost:${port}`);
  } catch (error) {
    logger.error('❌ Failed to start application:', error.message);
    process.exit(1); // Keluar paksa jika gagal
  }
}

bootstrap();