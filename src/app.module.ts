import { RequestContextMiddleware } from "@/common/middleware/request-context-middleware";
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import {APP_FILTER, APP_INTERCEPTOR, RouterModule} from '@nestjs/core';
import { ApiClientModule } from './api-client/api-client.module';
import { AppController } from './app.controller';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { AllExceptionFilter } from './common/filters/exceptions/all-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import { DomainModule } from './domain/domain.module';
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { RedisManagerModule } from "./bootstrap/redis/redis-manager.module";

@Module({
  imports: [
    BootstrapModule,
    ApiClientModule,
    DomainModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisManagerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
/*    {
      provide:APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor
    }*/
  ],
  exports: [BootstrapModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(RequestContextMiddleware)
        .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
