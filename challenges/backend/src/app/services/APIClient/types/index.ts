import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestConfiguration = {
  query?: any;
  headers?: object;
};

export type APIResponse = {
  data: any;
  status: number;
};
