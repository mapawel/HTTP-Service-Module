import path from 'path';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpServiceDecorator } from './HttpServiceDecorator.js';
import { CacheStore } from '../../Cache/CacheStore.js';
import { HttpService } from '../HttpService.js';
import { validateHttpMethodParam } from '../validators/validateHttpMethodParam.js';
import { CacheServiceError } from '../../Cache/CacheServiceError.js';

export class HttpServiceWithCache extends HttpServiceDecorator {
  private makeFullURL(urlT: string, config?: AxiosRequestConfig) {
    return path.join(
      (config?.baseURL
        ? config.baseURL
        : HttpService.getAxiosDefaults().baseURL) || '',
      urlT
    );
  }

  public async get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const urlT = url.trim();
    validateHttpMethodParam(this.makeFullURL(urlT, config));
    const cacheStore = CacheStore.getInstance();
    const foundCache = cacheStore.getCachedData(this.makeFullURL(urlT, config));
    if (foundCache) return Promise.resolve(foundCache);

    const freshResponce: AxiosResponse | undefined = await super.get(
      urlT,
      config
    );
    cacheStore.addToCache(this.makeFullURL(urlT, config), freshResponce);
    return freshResponce;
  }
}
