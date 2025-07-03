import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
) {
  const port = configService.get('app.port');
  const config = new DocumentBuilder()
    .setTitle(configService.get('app.name'))
    .addServer(
      configService.get('config.server.profiles') === 'prod'
        ? `${process.env.BACKEND_URL}`
        : `https://localhost:${port}`,
    )
    .setVersion('v1')
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          password: {
            tokenUrl: 'admin/oauth/client/login',
            scopes: {},
          },
        },
      },
      'sso-auth',
    )
      .addOAuth2(
          {
            type: 'oauth2',
            flows: {
              password: {
                tokenUrl: 'auth/login',
                scopes: {},

              },
            },
          },
          'web-auth',
      )
    //    .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   'bearer-auth',
    // )
    // .addBasicAuth({ type: 'http' }, 'basic-auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/doc', app, document
  , {
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  }
);
}
