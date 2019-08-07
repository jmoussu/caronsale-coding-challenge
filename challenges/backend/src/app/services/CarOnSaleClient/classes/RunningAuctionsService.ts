import {injectable} from "inversify";
import "reflect-metadata";
import { CarOnSaleClient } from "./CarOnSaleClient";
import { IRunningAuctionsService } from "../interface/IRunningAuctionsService";

@injectable()
export class RunningAuctionsService implements IRunningAuctionsService {

    private carOnSaleClient: CarOnSaleClient;

    public setCarOnSaleClient(carOnSaleClient: CarOnSaleClient) {
        this.carOnSaleClient = carOnSaleClient;
    }

    public async displayInformation(logger: any): Promise<number> {
        // get list of auctions from caronsale client
        const listAuctions = await this.carOnSaleClient.getRunningAuctions();
        if (!listAuctions) {
            return Promise.resolve(-1);
        }
        // display the information
        logger.log(`number of auctions: ${listAuctions.length}`);
        listAuctions.forEach((auction, index) => {
            logger.log(`average number of bids on auction ${index}: ${auction.getAvgNumberBids()}`);
            logger.log(`average percentage of auction ${index} progress: ${auction.getAvgPercentAuctionsProgress()}`);
        });
        return Promise.resolve(0);
    }

}
