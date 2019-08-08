import { IAuction } from '../interfaces';
import { AuctionInitialData } from '../types';

export default class Auction implements IAuction {
  private _id: number;
  private _numBids: number;
  private _currentHighestBidValue: number;
  private _minimumRequiredAsk: number;
  private _auctionProgress: number;

  constructor(data: AuctionInitialData) {
    const { id, currentHighestBidValue, minimumRequiredAsk, numBids } = data;

    this._id = id;
    this._minimumRequiredAsk = minimumRequiredAsk || 0;
    this._numBids = numBids;
    this._currentHighestBidValue = currentHighestBidValue;
    this._auctionProgress = this.getAuctionProgress();
  }

  private _validateMinimumRequiredAsk(): boolean {
    return Boolean(this._minimumRequiredAsk);
  }

  getAuctionProgress(): number {
    if (Boolean(this._auctionProgress)) return this._auctionProgress;

    if (!this._validateMinimumRequiredAsk()) return 100;

    const rawResult: number =
      (this._currentHighestBidValue * 100) / this._minimumRequiredAsk;
    const rawResultAsString: string = rawResult.toFixed(2);

    const result: number = parseFloat(rawResultAsString);
    return result;
  }

  compareId(id: number): boolean {
    return this._id === id;
  }

  getTotalBids(): number {
    return this._numBids;
  }
}
