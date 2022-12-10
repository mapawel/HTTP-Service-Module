import { HttpService } from '../HttpService.js';
import { IhttpService } from '../httpServiceInterface';
import type { DataType } from '../requestBodyDataType';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpServiceDecorator implements IhttpService {
  protected component: HttpService;

  constructor(component: HttpService) {
    this.component = component;
  }

  public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
    return this.component.get(url, config);
  }
  public post(
    url: string,
    data: DataType,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse | undefined> {
    return this.component.post(url, data, config);
  }
  public delete(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse | undefined> {
    return this.component.delete(url, config);
  }
}
