// TODO: Finish the implementation of the login and the APIClient
// TODO: Make test and run the app
import { injectable, inject } from 'inversify';

import CarOnSaleClient from './CarOnSaleClient';
import Auction from './Auction';
import { ISalesman } from '../interfaces';
import { BuildURLConfig, LoginResponseType } from '../types';
import { DependencyIdentifier } from '../../../DependencyIdentifiers';
import { unwatchFile } from 'fs';

const { CARONSALE_CLIENT } = DependencyIdentifier;

export default class Salesman implements ISalesman {
  private _userId: string;
  private _password: string;
  private _userEmail: string;
  private _token: string;
  private _cosclient: CarOnSaleClient;
  private _auctions: Array<Auction>;

  constructor(
    userEmail: string,
    password: string,
    @inject(CARONSALE_CLIENT) client: CarOnSaleClient
  ) {
    this._userEmail = userEmail;
    this._password = password;
    this._cosclient = client;
  }

  getQtyOfAuctions(): number {
    return this._auctions.length;
  }

  getAllAuctions(): Array<Auction> {
    return this._auctions;
  }
  getAnAuction(id: number): Auction {
    const auction: Auction = this._auctions.filter(auction =>
      auction.compareId(id)
    )[0];

    return auction;
  }

  getAvgBids(): number {
    const totalOfBids: number = this._auctions.reduce(
      (acc, auction) => acc + auction.getTotalBids(),
      0
    );

    const avg: number = totalOfBids / this.getQtyOfAuctions();

    return avg;
  }

  getAvgAuctionProgress(): number {
    const totalProgress: number = this._auctions.reduce(
      (total, auction) => total + auction.getAuctionProgress(),
      0
    );

    const avg: number = totalProgress / this.getQtyOfAuctions();

    return avg;
  }
}
