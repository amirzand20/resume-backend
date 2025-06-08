import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set up global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Resume Management API')
    .setDescription(`API for managing resumes and related data.`)
    .setVersion('1.0')
    // Add OAuth2 configuration
    .addOAuth2({
      type: 'oauth2',
      flows: {
        password: {
          tokenUrl: `http://localhost:3000/auth/login`,
          scopes: {},
        }
      },
      name: 'jwt-auth',
      description: 'jwt authentication',
    })
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Configure Swagger UI with OAuth2
  SwaggerModule.setup('api', app, document);
  
  // Enable CORS
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);

  console.log(`+--------------------------------------------------+`);
  console.log(`| Server is running on  http://localhost:${process.env.PORT ?? 3000}      |`);
  console.log(`| Swagger is running on  http://localhost:${process.env.PORT ?? 3000}/api |`);
  console.log(`+--------------------------------------------------+`);
}
bootstrap();
