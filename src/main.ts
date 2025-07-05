import {
  BadRequestException,
  ValidationPipe
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
  initializeTransactionalContext()
  
  // For development, use HTTP only
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  
  // Configure CORS for development
  app.enableCors({
    origin: true, // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  const configService = app.get(ConfigService);
  setupSwagger(app, configService);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      transformOptions: { enableImplicitConversion: true },
      validationError: {
        target: true,
        value: true,
      },
      exceptionFactory: (errors) => {
        const result = errors.map((error, index) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
    }),
  );

  const port = configService.get("PORT") || 3000;
  await app.listen(port);
  
  console.info('----------------------------------------------------');
  console.info(`| Server URL: http://localhost:${port}             |`);
  console.info(`| Swagger URL: http://localhost:${port}/doc        |`);
  console.info('----------------------------------------------------');
}
bootstrap();
