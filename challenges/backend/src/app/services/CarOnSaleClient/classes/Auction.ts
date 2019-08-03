import { equal, ok } from "assert";
import "reflect-metadata";

export class Auction {
    public numBids: number;
    public minimumRequiredAsk: number;
    public currentHighestBidValue: number;

    public constructor(auction: Partial<Auction>) {
        this.numBids = auction.numBids || null;
        this.minimumRequiredAsk = auction.minimumRequiredAsk || null;
        this.currentHighestBidValue = auction.currentHighestBidValue || null;

        ok(this.minimumRequiredAsk === null || this.minimumRequiredAsk >= 0,
            "bad minimumRequiredAsk");
        if(this.numBids === 0 || this.numBids === null) {
            ok(this.currentHighestBidValue === null,
                "expected null currentHighestBidValue");
        } else {
            ok(this.numBids >= 0,
                "expected numBids >= 0");
            ok(this.currentHighestBidValue > 0,
                `expected positive currentHighestBidValue, actual: ${this.currentHighestBidValue}`);
        }
    }
}
