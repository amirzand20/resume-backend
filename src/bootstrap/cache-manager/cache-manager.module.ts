import {  Module } from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import { CacheModule, CacheOptions } from '@nestjs/cache-manager';
import { Store } from 'cache-manager';

@Module({
  providers: [CacheManagerService],
  exports: [CacheManagerService],
  imports: [
    CacheModule.registerAsync<CacheOptions>({  
      useFactory: async (configService: ConfigService): Promise<CacheOptions> => {  
        return {  
          store: redisStore as unknown as Store,  
          db: configService.get<number>('REDIS_DB',1),
          host: configService.get('REDIS_HOST','192.168.70.3') ,
          port: configService.get('REDIS_PORT',6379) ,
          auth_pass: configService.get('REDIS_PASS', "")
        };  
      },  
      inject: [ConfigService],  
    }), 
  ],
})
export class CacheManagerModule {}
