import {IAuction} from "../../ApiClient/interface/IAuction";
import {IRunningAuctionViewModel} from "../interface/IRunningAuctionViewModel";

export default class RunningAuctionViewModel implements IRunningAuctionViewModel {
    id: number;
    numBids: number;
    progress: number;

    public constructor(item: IAuction) {
        if (item == null) return;

        this.id = item.id;
        this.numBids = item.numBids;
        this.progress = RunningAuctionViewModel.getAuctionProgress(item);
    }

    private static getAuctionProgress(item: IAuction) {
        if (item.numBids == null || item.numBids === 0) {
            return 0;
        }

        if (item.minimumRequiredAsk == null || item.minimumRequiredAsk === 0) {
            return 100;
        }

        return item.currentHighestBidValue / item.minimumRequiredAsk * 100;
    }
}