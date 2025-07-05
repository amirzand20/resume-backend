import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
) {
  const port = configService.get('app.port') || 3000;
  
  const config = new DocumentBuilder()
    .setTitle(configService.get('app.name') || 'Resume Backend API')
    .setDescription('API documentation for Resume Backend')
    .addServer(`http://localhost:${port}`, 'Local Development')
    .setVersion('v1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearer-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
  });

  SwaggerModule.setup('/doc', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      persistAuthorization: true,
      tryItOutEnabled: true,
    },
    customSiteTitle: 'Resume Backend API Documentation',
  });
}
