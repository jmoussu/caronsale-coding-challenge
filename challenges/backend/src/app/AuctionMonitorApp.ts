import {inject, injectable} from "inversify";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {ILogger} from "./services/Logger/interface/ILogger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CLIENT) private client: ICarOnSaleClient,
    ) { }

    public async start(userMailId: string): Promise<void> {

        this.logger.log(`Auction Monitor started.`);

        const auctions = await this.client.getRunningAuctions(userMailId);

        this.logger.log("count: " + auctions.length.toString());

        if(auctions.length <= 0) {
            return;
        }

        let bidsAvg = 0;
        let progressAvg = 0;

        for(const auction of auctions) {
            bidsAvg += auction.numBids;
            if(auction.minimumRequiredAsk > 0) {
                progressAvg += auction.currentHighestBidValue / auction.minimumRequiredAsk;
            } else if(auction.numBids > 0) {
                progressAvg += 1;
            }
        }
        bidsAvg /= auctions.length;
        progressAvg /= auctions.length;

        this.logger.log("average bids: " + bidsAvg.toString());
        this.logger.log("average progress: " + progressAvg.toString());
        // TODO: Retrieve auctions and display aggregated information (see README.md)

    }

}
