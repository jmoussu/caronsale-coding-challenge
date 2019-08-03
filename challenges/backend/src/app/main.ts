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
import * as fetch from "node-fetch";

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
container.bind<fetchfn>(DependencyIdentifier.FETCH).toFunction(fetch.default);

const authedFetchFactory = container.resolve(AuthedFetchFactory);

const conf = {
    baseUrl: "https://caronsale-backend-service-dev.herokuapp.com/api/v1/",
    userMailId: "salesman@random.com",
    password: "123test",
};

(async () => {
    {
        const authedFetch = await authedFetchFactory.authenticate(
            conf.baseUrl, conf.userMailId, conf.password,
        );
        container.bind<fetchfn>(DependencyIdentifier.AUTHED_FETCH).toFunction(authedFetch);
    }

    /*
    * Inject all dependencies in the application & retrieve application instance.
    */
    const app = container.resolve(AuctionMonitorApp);

    /*
    * Start the application
    */
    await app.start(conf.userMailId);
})();
