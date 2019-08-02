import {Container} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {Logger} from "./services/Logger/classes/Logger";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {CarOnSaleClient} from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import {IAuction} from "./services/CarOnSaleClient/interface/IAuction";
import {Auction} from "./services/CarOnSaleClient/classes/Auction";
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {AuthedFetchFactory, fetchfn} from "./services/CarOnSaleClient/classes/AuthedFetch";

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
container.bind<ICarOnSaleClient>(DependencyIdentifier.CLIENT).to(CarOnSaleClient);
container.bind<IAuction>(DependencyIdentifier.AUCTION_CONSTRUCTOR).toConstructor(Auction);

(async () => {
    {
        const fetch: fetchfn = await AuthedFetchFactory.authenticate("salesman@random.com", "123test");
        container.bind<fetchfn>(DependencyIdentifier.AUTHED_FETCH).toFunction(fetch);
    }

    /*
    * Inject all dependencies in the application & retrieve application instance.
    */
    const app = container.resolve(AuctionMonitorApp);

    /*
    * Start the application
    */
    await app.start();
})();
