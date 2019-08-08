/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
import { IRequestConfiguration, IAPIResponse } from '../interfaces';

export default interface IAPIClient {
  setBaseUrl(baseURL: string): void;
  getClientHeaders(): object;
  get(url?: string, config?: IRequestConfiguration): Promise<IAPIResponse>;
  put(
    body: object,
    url?: string,
    config?: IRequestConfiguration,
  ): Promise<IAPIResponse>;
}
