import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {
    private _exitCode: number = 0;

    get exitCode(): number {
        return this._exitCode;
    }

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger,
                       @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private client: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);

        try {
            const result = await this.client.getRunningAuctions();
            this.logger.log(JSON.stringify(result));
        } catch (error) {
            this.logger.log(error.message);
            this._exitCode = 1;
        }

        process.exit(this.exitCode)
    }
}