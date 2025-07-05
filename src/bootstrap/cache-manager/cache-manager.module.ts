import {  Module } from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';
// import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import { CacheModule, CacheOptions } from '@nestjs/cache-manager';
// import { Store } from 'cache-manager';

@Module({
  providers: [CacheManagerService],
  exports: [CacheManagerService],
  imports: [
    CacheModule.registerAsync<CacheOptions>({  
      useFactory: async (configService: ConfigService): Promise<CacheOptions> => {  
        return {  
          // store: redisStore as unknown as Store,  
          ttl: 60000, // 60 seconds
          max: 100, // maximum number of items in cache
        };  
      },  
      inject: [ConfigService],  
    }), 
  ],
})
export class CacheManagerModule {}
