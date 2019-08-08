import { IAuction, IAuctionInitialData } from '../interfaces';

export default class Auction implements IAuction {
  private id: number;
  private numBids: number;
  private currentHighestBidValue: number;
  private minimumRequiredAsk: number;
  private auctionProgress: number;

  public constructor(data: IAuctionInitialData) {
    const { id, currentHighestBidValue, minimumRequiredAsk, numBids } = data;

    this.id = id;
    this.minimumRequiredAsk = minimumRequiredAsk || 0;
    this.numBids = numBids;
    this.currentHighestBidValue = currentHighestBidValue;
    this.auctionProgress = this.getAuctionProgress();
  }

  private _validateMinimumRequiredAsk(): boolean {
    return Boolean(this.minimumRequiredAsk);
  }

  public getAuctionProgress(): number {
    if (Boolean(this.auctionProgress)) {
      return this.auctionProgress;
    }

    if (!this._validateMinimumRequiredAsk()) {
      return 100;
    }

    const rawResult: number =
      (this.currentHighestBidValue * 100) / this.minimumRequiredAsk;
    const rawResultAsString: string = rawResult.toFixed(2);

    const result: number = parseFloat(rawResultAsString);
    return result;
  }

  public compareId(id: number): boolean {
    return this.id === id;
  }

  public getTotalBids(): number {
    return this.numBids;
  }
}
