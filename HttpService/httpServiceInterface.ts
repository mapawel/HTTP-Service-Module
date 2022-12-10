import { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DataType } from './requestBodyDataType';

// jak ten interfejs miałby wyglądać gdym chciał metody get, post, delete wrapować dekoratorami? Czy byłby konieczny?
export interface IhttpService {
  get: (
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse | undefined>;
  post: (
    url: string,
    data: DataType,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse | undefined>;
  delete: (
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse | undefined>;
}
