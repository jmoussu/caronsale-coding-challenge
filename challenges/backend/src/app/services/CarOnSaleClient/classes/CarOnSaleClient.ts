import 'reflect-metadata';
import { injectable, inject, interfaces } from 'inversify';
import { sha512 } from 'js-sha512';

import { ICarOnSaleClient, IBuildURLConfig, ILoginResponseType } from '../interfaces';
import { DependencyIdentifier } from '../../../DependencyIdentifiers';

import { ILogger } from '../../Logger/interface/ILogger';
import { IAPIClient } from '../../APIClient/interfaces';

const { LOGGER, API_CLIENT } = DependencyIdentifier;

@injectable()
export default class CarOnSaleClient implements ICarOnSaleClient {
  private apiClient: IAPIClient;
  private logger: ILogger;
  private readonly baseURL: string =
    'http://caronsale-backend-service-dev.herokuapp.com/api/v1';
  private readonly auctionsURL: string = '/auction/salesman/';
  private readonly loginURL: string = '/authentication';

  public constructor(
    @inject(LOGGER) logger: ILogger,
    @inject(`Newable<${API_CLIENT}>`) APIClient: interfaces.Newable<IAPIClient>,
  ) {
    this.logger = logger;
    this.apiClient = new APIClient(this.baseURL);
  }

  private _buildURL(param: string, config: IBuildURLConfig): string {
    const { login } = config;
    const url: string = login
      ? `${this.loginURL}/${param}`
      : `${this.auctionsURL}${param}/_all`;

    return url;
  }

  public hashString(str: string, cycles: number): string {
    let hash = str;

    for (let index = 0; index < cycles; index++) {
      hash = sha512(hash);
    }

    return hash;
  }

  public async getRunningAuctions(
    userMailId: string,
    userId: string,
    token: string,
  ): Promise<any[]> {
    const url = this._buildURL(userMailId, { getAuctions: true });

    this.logger.log('Retrieving Auctions...');
    const { data } = await this.apiClient.get(url, {
      headers: { authtoken: token, userid: userId },
    });

    return data;
  }

  public async loginSalesman(email: string, hash: string): Promise<ILoginResponseType> {
    const url = this._buildURL(email, { login: true });

    this.logger.log('Login salesman...');
    const { data } = await this.apiClient.put({ password: hash }, url);

    const { token, userId } = data;
    const loginResponse: ILoginResponseType = { token, userid: userId };

    return loginResponse;
  }
}
