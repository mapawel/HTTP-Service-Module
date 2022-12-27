import { AxiosResponse } from 'axios';
import { validateCacheInput } from './validator/validateCacheInput.js';

export class CacheStore {
  private static instance: CacheStore | null;
  private cacheData: Map<string, AxiosResponse> = new Map();

  private constructor() {}

  static getInstance() {
    if (CacheStore.instance) return CacheStore.instance;
    return (CacheStore.instance = new CacheStore());
  }

  // especially for unit testing
  static resetInstance(): void {
    CacheStore.instance = null;
  }

  addToCache(key: string, value: AxiosResponse): boolean {
    validateCacheInput(key);
    if (CacheStore.getInstance().cacheData.get(key)) return false;
    CacheStore.getInstance().cacheData.set(key, value);
    return true;
  }

  getCachedData(key: string): AxiosResponse | false {
    validateCacheInput(key);
    return CacheStore.getInstance().cacheData.get(key) || false;
  }

  removeCachedData(key: string): boolean {
    validateCacheInput(key);
    return CacheStore.getInstance().cacheData.delete(key);
  }
}
