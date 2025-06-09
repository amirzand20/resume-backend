import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe());
  
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Resume API')
    .setDescription(`API for managing resumes and related data.`)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'oauth2',
        flows: {
          password: {
            tokenUrl: `http://localhost:3000/auth/login`,
            scopes: {},
          }
        },
      },'jwt-auth'
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Configure Swagger UI
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  // Enable CORS
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);

  console.log(`+--------------------------------------------------+`);
  console.log(`| Server is running on  http://localhost:${process.env.PORT ?? 3000}      |`);
  console.log(`| Swagger is running on  http://localhost:${process.env.PORT ?? 3000}/api |`);
  console.log(`+--------------------------------------------------+`);
}
bootstrap();
