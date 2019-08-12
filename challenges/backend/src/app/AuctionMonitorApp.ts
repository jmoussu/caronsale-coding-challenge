import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class AuctionMonitorApp {

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger,
                       @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private client: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);

        try {
            const result = await this.client.getRunningAuctions();
            this.logger.log(JSON.stringify(result));
            process.exitCode = 0;
        } catch (error) {
            this.logger.log(error.message);
            process.exitCode = 1;
        }

        this.logger.log(`Application finished with exit code of ${process.exitCode}`)
    }
}