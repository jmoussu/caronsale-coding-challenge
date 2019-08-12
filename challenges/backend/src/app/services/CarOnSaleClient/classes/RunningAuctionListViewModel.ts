import {IAuction} from "../../ApiClient/interface/IAuction";
import {IRunningAuctionListViewModel} from "../interface/IRunningAuctionListViewModel";
import {IRunningAuctionViewModel} from "../interface/IRunningAuctionViewModel";
import RunningAuctionViewModel from "./RunningAuctionViewModel";

export default class RunningAuctionListViewModel implements IRunningAuctionListViewModel {
    items: Array<IRunningAuctionViewModel>;
    totalCount: number;

    public constructor(items: Array<IAuction>) {
        if (items == null || items.length == 0) return;

        this.totalCount = items.length;
        this.items = items.map(value => new RunningAuctionViewModel(value))
    }
}