import 'reflect-metadata';
import { injectable } from 'inversify';
import { sha512 } from 'js-sha512';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ICarOnSaleClient } from '../interfaces';
import { BuildURLConfig, LoginResponseType } from '../types';
import { DependencyIdentifier } from '../../../DependencyIdentifiers';

import { Logger } from '../../Logger/classes/Logger';
import APIClient from '../../APIClient/classes/APIClient';

const { LOGGER } = DependencyIdentifier;

@injectable()
export default class CarOnSaleClient implements ICarOnSaleClient {
  private _apiClient: APIClient;
  private _logger: Logger;
  private readonly _baseURL: string =
    'http://caronsale-backend-service-dev.herokuapp.com/api/v1';
  private readonly _auctionsURL: string = '/auction/salesman/';
  private readonly _loginURL: string = '/authentication';

  constructor() {
    this._logger = new Logger();
    this._apiClient = APIClient.getInstance(this._baseURL);

    // ? delete later
    this._apiClient.setRequestHooks(
      this._preRequestHook.bind(this),
      this._onErrorRequestHook.bind(this)
    );

    // this._apiClient.setResponseHooks(
    //   this._preResponseHook.bind(this),
    //   this._onErrorResponseHook.bind(this)
    // );
  }

  private _buildURL(param: string, config: BuildURLConfig): string {
    const { login } = config;
    const url: string = login
      ? `${this._loginURL}/${param}`
      : `${this._auctionsURL}${param}/_all`;

    return url;
  }

  private async _preRequestHook(
    value: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    this._logger.log(
      `CarOnSale:: On Pre Hook Request - Request: ${JSON.stringify(value)}`
    );

    return value;
  }

  private async _onErrorRequestHook(error: any): Promise<any> {
    this._logger.log(
      `CarOnSale:: On Error Hook Request - Error: ${JSON.stringify(error)}`
    );

    return error;
  }

  private async _preResponseHook(value: AxiosResponse): Promise<AxiosResponse> {
    this._logger.log(
      `CarOnSale:: On Pre Hook Response - Error: ${JSON.stringify(value)}`
    );

    return value;
  }

  private async _onErrorResponseHook(error: any): Promise<any> {
    this._logger.log(
      `CarOnSale:: On Error Hook Response - Error: ${JSON.stringify(error)}`
    );

    return error;
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

    const { data } = await this._apiClient.get(url, {
      headers: { authtoken: token, userid: userId }
    });

    return data;
  }

  async loginSalesman(email: string, hash: string): Promise<LoginResponseType> {
    this._logger.log('Login salesman...');
    const url = this._buildURL(email, { login: true });
    const { data } = await this._apiClient.put({ password: hash }, url);

    const { token, userId } = data;
    const loginResponse: LoginResponseType = { token, userid: userId };

    return loginResponse;
  }
}
