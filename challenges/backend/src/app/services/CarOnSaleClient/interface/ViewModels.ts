export interface IRunningAuctionListViewModel {
    totalCount: number;
    items: Array<IRunningAuctionViewModel>
}

export interface IRunningAuctionViewModel {
    id: number;
    numBids: number;
    progress: number;
}