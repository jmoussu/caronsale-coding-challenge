/**
 * Interface to give the needed auctions data.
 */
export interface IAuction {
    numBids: number;
    minimumRequiredAsk: number;
    currentHighestBidValue: number;

    getAvgPercentAuctionsProgress(): number;
    getAvgNumberBids(): number;
}
