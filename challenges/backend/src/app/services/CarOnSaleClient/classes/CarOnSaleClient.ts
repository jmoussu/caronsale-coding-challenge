import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import IRunningAuctionListViewModel = ViewModel.IRunningAuctionListViewModel;

export default class CarOnSaleClient implements ICarOnSaleClient {
    getRunningAuctions(): Promise<IRunningAuctionListViewModel> {
        return Promise.resolve(<IRunningAuctionListViewModel>{});
    }
}