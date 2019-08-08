import { ILoginResponseType } from '../types';

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */

export interface IAuction {
  getAuctionProgress(): number;
}

export interface ISalesman {
  init(): Promise<void>;
  getQtyOfAuctions(): number;
  getAllAuctions(): Promise<IAuction[]>;
  getAnAuction(id: number): IAuction;
  getAvgBids(): number;
  getAvgAuctionProgress(): number;
}

export interface ICarOnSaleClient {
  getRunningAuctions(
    userMailId: string,
    userId: string,
    token: string,
  ): Promise<any[]>;
  loginSalesman(
    email: string,
    hash: string,
  ): Promise<ILoginResponseType>;
}

export interface IBuildURLConfig {
  login?: boolean;
  getAuctions?: boolean;
}

export interface ILoginResponseType {
  token: string;
  userid: string;
}

export interface IAuctionInitialData {
  id?: number;
  numBids?: number;
  currentHighestBidValue?: number;
  minimumRequiredAsk?: number;
}
