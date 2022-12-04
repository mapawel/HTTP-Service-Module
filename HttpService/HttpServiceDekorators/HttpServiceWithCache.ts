import path from 'path';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpServiceDecorator } from './HttpServiceDecorator.js';
import { CacheStore } from '../../Cache/CacheStore.js';
import { HttpService } from '../HttpService.js';

export class HttpServiceWithCache extends HttpServiceDecorator {
  public async get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const cacheStore = CacheStore.getInstance();
    const foundCache = cacheStore.getCachedData(
      path.join(HttpService.getAxiosDefaults().baseURL || '', url)
    );
    if (foundCache) return Promise.resolve(foundCache);

    const freshResponce = await super.get(url, config);
    cacheStore.addToCache(
      path.join(HttpService.getAxiosDefaults().baseURL || '', url),
      freshResponce
    );
    return freshResponce;
  }
}
