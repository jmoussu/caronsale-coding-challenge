import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {RunningAuctionsService} from "./services/CarOnSaleClient/classes/RunningAuctionsService";
import {CarOnSaleClient} from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CARONSALECLIENT) private caronsaleclient: CarOnSaleClient,
        @inject(DependencyIdentifier.RUNNINGAUCTIONSSERVICE) private runningauctionsservice: RunningAuctionsService) {
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);
        this.runningauctionsservice.setCarOnSaleClient(this.caronsaleclient);
        const exitCode = await this.runningauctionsservice.displayInformation(this.logger);
        process.exit(exitCode);

    }

}
