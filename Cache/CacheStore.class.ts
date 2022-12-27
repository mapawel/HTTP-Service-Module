import { AxiosResponse } from 'axios';
import { validateCacheInput } from './validator/validateCacheInput.js';

export class CacheStore {
  private static cacheData: Map<string, AxiosResponse> = new Map();
  private static instance: CacheStore;

  private constructor() {}

  static getInstance() {
    if (CacheStore.instance) return CacheStore.instance;
    return (CacheStore.instance = new CacheStore());
  }

  addToCache(key: string, value: AxiosResponse): boolean {
    validateCacheInput(key);
    if (CacheStore.cacheData.get(key)) return false;
    CacheStore.cacheData.set(key, value);
    return true;
  }

  getCachedData(key: string): AxiosResponse | false {
    validateCacheInput(key);
    return CacheStore.cacheData.get(key) || false;
  }

  removeCachedData(key: string): boolean {
    validateCacheInput(key);
    return CacheStore.cacheData.delete(key);
  }
}
