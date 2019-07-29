import {Container} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {Logger} from "./services/Logger/classes/Logger";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {CarOnSaleClient} from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import {IRunningAuctionsService} from "./services/CarOnSaleClient/interface/IRunningAuctionsService";
import {RunningAuctionsService} from "./services/CarOnSaleClient/classes/RunningAuctionsService";
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {DependencyIdentifier} from "./DependencyIdentifiers";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IRunningAuctionsService>(DependencyIdentifier.RUNNINGAUCTIONSSERVICE).to(RunningAuctionsService);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CARONSALECLIENT).to(CarOnSaleClient);


/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
})();
