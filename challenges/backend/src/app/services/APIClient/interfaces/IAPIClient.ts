/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
import { RequestConfiguration, APIResponse } from '../types';

export default interface IAPIClient {
  setBaseUrl(baseURL: string): void;
  getClientHeaders(): object;
  get(url?: string, config?: RequestConfiguration): Promise<APIResponse>;
  put(
    body: object,
    url?: string,
    config?: RequestConfiguration
  ): Promise<APIResponse>;
}
