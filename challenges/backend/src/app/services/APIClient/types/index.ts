import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestConfiguration = {
  query?: any;
  headers?: object;
};

export type APIResponse = {
  data: any;
  status: number;
};

export type APIError = {
  response?: APIResponse;
  request?: any;
  message?: string;
};

export type CallbackPreHookRequest = (
  value: AxiosRequestConfig
) => Promise<AxiosRequestConfig>;

export type CallbackOnErrorRequest = (error: any) => Promise<any>;

export type CallbackHookResponse = (
  value: AxiosResponse
) => Promise<AxiosResponse>;

export type CallbackOnErrorResponse = (error: any) => Promise<any>;
