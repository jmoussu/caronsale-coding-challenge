import axios, { AxiosInstance } from 'axios';

import { IAPIClient } from '../interfaces';
import {
  RequestConfiguration,
  APIResponse,
  APIError,
  CallbackPreHookRequest,
  CallbackOnErrorRequest,
  CallbackHookResponse,
  CallbackOnErrorResponse
} from '../types';

export default class APIClient implements IAPIClient {
  private _client: AxiosInstance;
  private _requestHooksId: number;
  private _responseHooksId: number;
  private static _instance: APIClient;

  constructor(baseURL?: string, headers?: object) {
    this._client = axios.create({ baseURL, headers });
  }

  static getInstance(baseUrl?: string) {
    if (!this._instance) {
      this._instance = new APIClient(baseUrl);
    }

    return this._instance;
  }

  private _getRequestConfig(config: RequestConfiguration): any {
    const { query, headers } = config || ({} as RequestConfiguration);

    return { params: query, headers };
  }

  setBaseUrl(baseUrl: string): void {
    this._client.defaults.baseURL = baseUrl;
  }

  setRequestHooks(
    pre: CallbackPreHookRequest,
    onError: CallbackOnErrorRequest
  ): void {
    this._requestHooksId = this._client.interceptors.request.use(pre, onError);
  }

  setResponseHooks(
    pre: CallbackHookResponse,
    onError: CallbackOnErrorResponse
  ) {
    this._responseHooksId = this._client.interceptors.response.use(
      pre,
      onError
    );
  }

  removeRequestHooks(): void {
    this._client.interceptors.request.eject(this._requestHooksId);
  }

  removeResponseHooks(): void {
    this._client.interceptors.response.eject(this._responseHooksId);
  }

  getClientHeaders(): object {
    return this._client.defaults.headers;
  }

  async put(body: object, url?: string, config?: RequestConfiguration) {
    try {
      const { query, headers } = this._getRequestConfig(config);

      const response: APIResponse = await this._client.put(url, body, {
        headers,
        params: query
      });

      return response;
    } catch (err) {
      const error: APIError = err;

      throw error;
    }
  }

  async get(url?: string, config?: RequestConfiguration) {
    try {
      const { query, headers } = this._getRequestConfig(config);

      const response: APIResponse = await this._client.get(url, {
        headers,
        params: query
      });

      return response;
    } catch (err) {
      const error: APIError = err;

      throw error;
    }
  }
}
