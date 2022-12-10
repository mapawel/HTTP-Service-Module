import { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DataType } from './requestBodyDataType';

// jak ten interfejs miałby wyglądać gdym chciał metody get, post, delete wrapować dekoratorami? Czy byłby konieczny?
export interface IhttpService {
  get: (
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  post: (
    url: string,
    data: DataType,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  delete: (
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
}
