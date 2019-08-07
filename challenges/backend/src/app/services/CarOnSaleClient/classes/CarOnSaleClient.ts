import 'reflect-metadata';
import { injectable, inject, interfaces } from 'inversify';
import { sha512 } from 'js-sha512';

import { ICarOnSaleClient } from '../interfaces';
import { BuildURLConfig, LoginResponseType } from '../types';
import { DependencyIdentifier } from '../../../DependencyIdentifiers';

import { ILogger } from '../../Logger/interface/ILogger';
import { IAPIClient } from '../../APIClient/interfaces';

const { LOGGER, API_CLIENT } = DependencyIdentifier;

@injectable()
export default class CarOnSaleClient implements ICarOnSaleClient {
  private _apiClient: IAPIClient;
  private _logger: ILogger;
  private readonly _baseURL: string =
    'http://caronsale-backend-service-dev.herokuapp.com/api/v1';
  private readonly _auctionsURL: string = '/auction/salesman/';
  private readonly _loginURL: string = '/authentication';

  constructor(
    @inject(LOGGER) logger: ILogger,
    @inject(`Newable<${API_CLIENT}>`) APIClient: interfaces.Newable<IAPIClient>
  ) {
    this._logger = logger;
    this._apiClient = new APIClient(this._baseURL);
  }

  private _buildURL(param: string, config: BuildURLConfig): string {
    const { login } = config;
    const url: string = login
      ? `${this._loginURL}/${param}`
      : `${this._auctionsURL}${param}/_all`;

    return url;
  }

  hashString(str: string, cycles: number): string {
    let hash = str;

    for (let index = 0; index < cycles; index++) {
      hash = sha512(hash);
    }

    return hash;
  }

  async getRunningAuctions(
    userMailId: string,
    userId: string,
    token: string
  ): Promise<Array<any>> {
    const url = this._buildURL(userMailId, { getAuctions: true });

    this._logger.log('Retrieving Auctions...');
    const { data } = await this._apiClient.get(url, {
      headers: { authtoken: token, userid: userId }
    });

    return data;
  }

  async loginSalesman(email: string, hash: string): Promise<LoginResponseType> {
    const url = this._buildURL(email, { login: true });

    this._logger.log('Login salesman...');
    const { data } = await this._apiClient.put({ password: hash }, url);

    const { token, userId } = data;
    const loginResponse: LoginResponseType = { token, userid: userId };

    return loginResponse;
  }
}
