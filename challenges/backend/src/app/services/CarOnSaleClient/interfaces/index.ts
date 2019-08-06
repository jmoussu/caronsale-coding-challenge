import { LoginResponseType } from '../types';

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */

export interface IAuction {
  getAuctionProgress(): number;
}

export interface ISalesman {
  init(): Promise<void>;
  retrieveAuctions(): Promise<void>;
  getQtyOfAuctions(): number;
  getAllAuctions(): Array<any>;
  getAnAuction(id: number): any;
  getAvgBids(): number;
  getAvgAuctionProgress(): number;
}

export interface ICarOnSaleClient {
  getRunningAuctions(
    userMailId: string,
    userId: string,
    token: string
  ): Promise<Array<any> /* TODO: Introduce a type */>;
  loginSalesman(
    email: string,
    hash: string
  ): Promise<LoginResponseType> /* TODO: Implement a Type */;
}
