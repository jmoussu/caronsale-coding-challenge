import {IRunningAuctionViewModel} from "./IRunningAuctionViewModel";

export interface IRunningAuctionListViewModel {
    totalCount: number;
    items: Array<IRunningAuctionViewModel>
}