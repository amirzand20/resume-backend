import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IORedis from 'ioredis';
import { RedisManagerService } from './redis-manager.service';

@Global()
@Module({
  providers: [
    RedisManagerService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService): Promise<any> => {
        // return new IORedis({
        //   host: configService.get('REDIS_HOST', 'localhost'),
        //   port: configService.get('REDIS_PORT', 6379),
        //   db: configService.get('REDIS_DB', 0),
        //   password: configService.get('REDIS_PASSWORD', ''),
        // });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisManagerModule {}
