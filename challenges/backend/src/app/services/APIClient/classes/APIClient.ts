import 'reflect-metadata';
import { injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';

import { IAPIClient, IRequestConfiguration, IAPIResponse } from '../interfaces';

@injectable()
export default class APIClient implements IAPIClient {
  private client: AxiosInstance;

  public constructor(baseURL?: string, headers?: object) {
    this.client = axios.create({ baseURL, headers });
  }

  private _getRequestConfig(config: IRequestConfiguration): any {
    const { query, headers } = config || ({} as IRequestConfiguration);

    return { params: query, headers };
  }

  public setBaseUrl(baseUrl: string): void {
    this.client.defaults.baseURL = baseUrl;
  }

  public getClientHeaders(): object {
    return this.client.defaults.headers;
  }

  public async put(body: object, url?: string, config?: IRequestConfiguration) {
    try {
      const { query, headers } = this._getRequestConfig(config);

      const response: IAPIResponse = await this.client.put(url, body, {
        headers,
        params: query,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async get(url?: string, config?: IRequestConfiguration) {
    try {
      const { query, headers } = this._getRequestConfig(config);

      const response: IAPIResponse = await this.client.get(url, {
        headers,
        params: query,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
