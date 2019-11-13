import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { AxiosResponse } from "axios";
import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CARONSALECLIENT) private CarOnSaleClient: ICarOnSaleClient) { }

    public async start(): Promise<void> {
        process.on('exit', (code) => {
            return this.logger.log(`Process EXIT with code ${code}`);
        });

        this.logger.log(`Auction Monitor started.`);

        let runningAuctions: AxiosResponse;
        let data: [];
        let numberOfAuctions: number;
        let averageNumberBids: number;
        let averagePercentageAuctionProgress: number;

        try {
            runningAuctions = await this.CarOnSaleClient.getRunningAuctions();
            data = runningAuctions.data;
            numberOfAuctions = data.length;

            averageNumberBids = 0;
            averagePercentageAuctionProgress = 0;
            data.forEach((element: { numBids: number, currentHighestBidValue: number, minimumRequiredAsk: number }) => {
                averageNumberBids = averageNumberBids + element.numBids;
                averagePercentageAuctionProgress = averagePercentageAuctionProgress + element.currentHighestBidValue / element.minimumRequiredAsk;
            });
            averageNumberBids = averageNumberBids / numberOfAuctions;
            averagePercentageAuctionProgress = averagePercentageAuctionProgress / numberOfAuctions * 100;
        } catch (error) {
            return process.exit(-1);
        }

        this.logger.log('Number of auctions : ' + numberOfAuctions);
        this.logger.log('Average number of bids : ' + averageNumberBids);
        this.logger.log('Average percentage of auction progress, : ' + averagePercentageAuctionProgress.toFixed(2) + '%');

        return process.exit(0);
    }
}
