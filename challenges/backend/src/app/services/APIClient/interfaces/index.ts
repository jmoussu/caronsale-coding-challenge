
export { default as IAPIClient } from './IAPIClient';

export interface IRequestConfiguration {
  query?: any;
  headers?: object;
}

export interface IAPIResponse {
  data: any;
  status: number;
}
