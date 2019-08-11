import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {IRunningAuctionListViewModel} from '../interface/ViewModels';
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export default class CarOnSaleClient implements ICarOnSaleClient {
    getRunningAuctions(): Promise<IRunningAuctionListViewModel> {
        return Promise.resolve(<IRunningAuctionListViewModel>{
            totalCount: 1,
            items: [
                {id: 1, numBids: 2, progress: 44}
            ]
        });
    }
}