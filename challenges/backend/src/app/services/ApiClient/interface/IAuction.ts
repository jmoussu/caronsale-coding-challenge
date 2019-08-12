export interface IAuction {
    id: number;
    minimumRequiredAsk: number;
    numBids: number;
    currentHighestBidValue: number;
}