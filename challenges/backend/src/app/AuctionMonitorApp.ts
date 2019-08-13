import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { AuctionItem } from "./services/CarOnSaleClient/models/AuctionItem";

@injectable()
export class AuctionMonitorApp {

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CLIENT) private client: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);

        this.client.getRunningAuctions()
            .then((response: AuctionItem[]) => {
                const numberOfItems: number = response.length;
                let totalBids: number = 0
                let progressRatio: number = 0;
                response.forEach(item => {
                    totalBids += item.numberOfBids;
                    progressRatio += item.currentBidValue / (item.minumunAsk || item.currentBidValue);
                });

                const averageBids: number = totalBids / numberOfItems;
                const averageProgressRatio = (progressRatio / numberOfItems) * 100;

                this.logger.log(`Number of Auctions: ${numberOfItems}`);
                this.logger.log(`Average bids in an Auction: ${averageBids}`);
                this.logger.log(`Auction average progress: ${averageProgressRatio.toFixed(2)}%`);
                process.exit();
            })
            .catch(() => process.exit(1));

        // TODO: Retrieve auctions and display aggregated information (see README.md)

    }

}