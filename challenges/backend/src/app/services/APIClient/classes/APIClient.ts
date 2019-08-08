import 'reflect-metadata';
import { injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';

import { IAPIClient } from '../interfaces';
import { RequestConfiguration, APIResponse } from '../types';

@injectable()
export default class APIClient implements IAPIClient {
  private client: AxiosInstance;

  public constructor(baseURL?: string, headers?: object) {
    this.client = axios.create({ baseURL, headers });
  }

  private _getRequestConfig(config: RequestConfiguration): any {
    const { query, headers } = config || ({} as RequestConfiguration);

    return { params: query, headers };
  }

  public setBaseUrl(baseUrl: string): void {
    this.client.defaults.baseURL = baseUrl;
  }

  public getClientHeaders(): object {
    return this.client.defaults.headers;
  }

  public async put(body: object, url?: string, config?: RequestConfiguration) {
    try {
      const { query, headers } = this._getRequestConfig(config);

      const response: APIResponse = await this.client.put(url, body, {
        headers,
        params: query,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async get(url?: string, config?: RequestConfiguration) {
    try {
      const { query, headers } = this._getRequestConfig(config);

      const response: APIResponse = await this.client.get(url, {
        headers,
        params: query,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
