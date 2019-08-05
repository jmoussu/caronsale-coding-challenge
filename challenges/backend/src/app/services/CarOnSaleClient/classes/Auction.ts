import { IAuction } from '../interfaces';
import { AuctionInitialData } from '../types';

export default class Auction implements IAuction {
  private _id: number;
  private _numBids: number;
  private _currentHighestBid: number;
  private _minimumRequiredAsk: number;
  public auctionProgress: number;

  constructor(data?: AuctionInitialData) {
    const { id, currentHighestBid, minimumRequiredAsk, numBids } = data;

    this._id = id;
    this._minimumRequiredAsk = minimumRequiredAsk;
    this._numBids = numBids;
    this._currentHighestBid = currentHighestBid;
    this.auctionProgress = this.getAuctionProgress();
  }

  getAuctionProgress(): number {
    if (this.auctionProgress) return this.auctionProgress;

    const result: number = Math.floor(
      (this._currentHighestBid * 100) / this._minimumRequiredAsk
    );

    return result;
  }

  compareId(id: number): boolean {
    return this._id === id;
  }

  getTotalBids(): number {
    return this._numBids;
  }
}
