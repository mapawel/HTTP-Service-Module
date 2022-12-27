import { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DataType } from './requestBodyData.type';

export interface IhttpService {
  get: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse>;
  post: (
    url: string,
    data: DataType,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  delete: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse>;
}
