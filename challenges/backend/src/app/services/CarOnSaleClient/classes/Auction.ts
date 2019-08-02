import "reflect-metadata";

export class Auction {
    public numBids: number;
    public minimumRequiredAsk: number;
    public currentHighestBidValue: number;

    public constructor(auction: Partial<Auction>) {
        this.numBids = auction.numBids || null;
        this.minimumRequiredAsk = auction.minimumRequiredAsk || null;
        this.currentHighestBidValue = auction.currentHighestBidValue || null;
    }
}