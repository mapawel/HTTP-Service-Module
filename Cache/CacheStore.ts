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

  addToCache(key: string, value: AxiosResponse) {
    validateCacheInput(key);
    if (CacheStore.cacheData.get(key)) return;
    CacheStore.cacheData.set(key, value);
  }

  getCachedData(key: string) {
    return CacheStore.cacheData.get(key);
  }

  removeCachedData(key: string) {
    return CacheStore.cacheData.delete(key);
  }
}
