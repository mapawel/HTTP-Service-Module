import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { IhttpService } from './httpServiceInterface';
import type { DataType } from './requestBodyDataType';
import { HttpServiceError } from './HttpServiceError.js';
import { validateHttpMethodParam } from './validators/validateHttpMethodParam.js';

export class HttpService implements IhttpService {
  private static axios: AxiosInstance;
  private static instance: HttpService;

  private constructor(configuration: AxiosRequestConfig) {
    HttpService.axios = axios.create(configuration);
  }

  public static getInstance(config: AxiosRequestConfig) {
    if (HttpService.instance) return HttpService.instance;
    return (HttpService.instance = new HttpService(config));
  }

  public static getAxiosDefaults() {
    return HttpService.axios.defaults;
  }

  public async get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      validateHttpMethodParam(url);
      return await HttpService.axios({
        url,
        method: 'GET',
        ...config,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new HttpServiceError(err?.message, 500);
      }
      throw new Error('Unexpected HTTP Service Error!');
    }
  }

  public async post(url: string, data: DataType, config?: AxiosRequestConfig) {
    validateHttpMethodParam(url);
    try {
      return await HttpService.axios({
        url,
        method: 'POST',
        data,
        ...config,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new HttpServiceError(err?.message, 500);
      }
      throw new Error('Unexpected HTTP Service Error!');
    }
  }

  // Error handling --> https://bobbyhadz.com/blog/typescript-property-status-does-not-exist-on-type-error

  public async delete(url: string, config?: AxiosRequestConfig) {
    validateHttpMethodParam(url);
    try {
      return await HttpService.axios({
        url,
        method: 'DELETE',
        ...config,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new HttpServiceError(err?.message, 500);
      }
      throw new Error('Unexpected HTTP Service Error!');
    }
  }
}
