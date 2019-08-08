import CarOnSaleClient from './CarOnSaleClient';
import Auction from './Auction';
import { ISalesman } from '../interfaces';

export default class Salesman implements ISalesman {
  private userId: string;
  private password: string;
  private userEmail: string;
  private token: string;
  private cosClient: CarOnSaleClient;
  private isAuthenticated: boolean;
  private auctions: Auction[];

  public constructor(userEmail: string, password: string, cosclient: CarOnSaleClient) {
    this.cosClient = cosclient;
    this.userEmail = userEmail;
    this.password = this.cosClient.hashString(password, 5);
  }

  private _parseRawAuctions(auction: any): Auction {
    return new Auction(auction);
  }

  private _fixToTwoDecimals(num: number): number {
    const rawNumber: string = num.toFixed(2);

    const result: number = parseFloat(rawNumber);
    return result;
  }

  private async _retrieveAuctions(): Promise<void> {
    if (!this.isAuthenticated) { return await this.init(); }

    const auctions: any[] = await this.cosClient.getRunningAuctions(
      this.userEmail,
      this.userId,
      this.token,
    );

    this.auctions = auctions.map(this._parseRawAuctions);
  }

  public async init(): Promise<void> {
    const { userid, token } = await this.cosClient.loginSalesman(
      this.userEmail,
      this.password,
    );

    this.token = token;
    this.userId = userid;

    this.isAuthenticated = true;

    await this._retrieveAuctions();
  }

  public getQtyOfAuctions(): number {
    return this.auctions.length;
  }

  public async getAllAuctions(): Promise<Auction[]> {
    if (!this.auctions) {
      await this._retrieveAuctions();
    }

    return this.auctions;
  }

  public getAnAuction(id: number): Auction {
    const auction: Auction = this.auctions.filter((auctionInArray) =>
      auctionInArray.compareId(id),
    )[0];

    return auction;
  }

  public getAvgBids(): number {
    const totalOfBids: number = this.auctions.reduce(
      (acc, auction) => acc + auction.getTotalBids(),
      0,
    );

    const qtyOfAuctions: number = this.getQtyOfAuctions();
    const rawAvg: number = totalOfBids / qtyOfAuctions;
    const avg: number = this._fixToTwoDecimals(rawAvg);

    return avg;
  }

  public getAvgAuctionProgress(): number {
    const totalProgress: number = this.auctions.reduce(
      (total, auction) => total + auction.getAuctionProgress(),
      0,
    );

    const qtyOfAuctions: number = this.getQtyOfAuctions();
    const rawAvg: number = totalProgress / qtyOfAuctions;
    const raw: number = this._fixToTwoDecimals(rawAvg);

    return raw;
  }
}
