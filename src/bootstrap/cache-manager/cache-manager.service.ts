import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {  Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheManagerService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
    
    async setCache(key: any, value: any, option: any): Promise<void> {
        await this.cacheManager.set(key, value, option);
    }

    async getCache(key: string): Promise<any> {
        return await this.cacheManager.get(key);
    }

    async removeCache(key: string) {
        await this.cacheManager.del(key);
    }

    async getAllKeys(): Promise<any[]> {
        return this.cacheManager.store.keys();
    }
}
