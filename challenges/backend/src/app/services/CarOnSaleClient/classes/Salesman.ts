// TODO: Finish the implementation of the login and the APIClient
// TODO: Make test and run the app

import CarOnSaleClient from './CarOnSaleClient';
import Auction from './Auction';
import { ISalesman } from '../interfaces';

export default class Salesman implements ISalesman {
  private _userId: string;
  private _password: string;
  private _userEmail: string;
  private _token: string;
  private _cosclient: CarOnSaleClient;
  private _auctions: Array<Auction>;

  constructor(userEmail: string, password: string, cosclient: CarOnSaleClient) {
    this._cosclient = cosclient;
    this._userEmail = userEmail;
    this._password = this._cosclient.hashString(password, 5);
  }

  private _parseRawAuctions(auction: any): Auction {
    return new Auction(auction);
  }

  async init() {
    const { userid, token } = await this._cosclient.loginSalesman(
      this._userEmail,
      this._password
    );

    this._token = token;
    this._userId = userid;

    await this.retrieveAuctions();
  }

  async retrieveAuctions() {
    const isAuthenticated: boolean =
      Boolean(this._token) && Boolean(this._userId);

    if (!isAuthenticated) return this.init();

    const auctions: Array<any> = await this._cosclient.getRunningAuctions(
      this._userEmail,
      this._userId,
      this._token
    );

    this._auctions = auctions.map(this._parseRawAuctions);
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
