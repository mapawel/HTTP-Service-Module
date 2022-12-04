import path from 'path';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpServiceDecorator } from './HttpServiceDecorator.js';
import { CacheStore } from '../../Cache/CacheStore.js';
import { HttpService } from '../HttpService.js';
import { validateHttpMethodParam } from '../validators/validateHttpMethodParam.js';

export class HttpServiceWithCache extends HttpServiceDecorator {
  public async get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const urlT = url.trim()
    validateHttpMethodParam(
      path.join(HttpService.getAxiosDefaults().baseURL || '', urlT)
    );
    const cacheStore = CacheStore.getInstance();
    const foundCache = cacheStore.getCachedData(
      path.join(HttpService.getAxiosDefaults().baseURL || '', urlT)
    );
    if (foundCache) return Promise.resolve(foundCache);

    const freshResponce = await super.get(urlT, config);
    cacheStore.addToCache(
      path.join(HttpService.getAxiosDefaults().baseURL || '', urlT),
      freshResponce
    );
    return freshResponce;
  }
}
