import { Container } from 'inversify';
import { ILogger } from './services/Logger/interface/ILogger';
import {
  IAuction,
  ISalesman,
  ICarOnSaleClient
} from './services/CarOnSaleClient/interfaces';
import {
  Auction,
  Salesman,
  CarOnSaleClient
} from './services/CarOnSaleClient/classes';
import { Logger } from './services/Logger/classes/Logger';
import { AuctionMonitorApp } from './AuctionMonitorApp';
import { DependencyIdentifier } from './DependencyIdentifiers';

/*
 * Create the DI container.
 */
const container = new Container({
  defaultScope: 'Singleton'
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IAuction>(DependencyIdentifier.AUCTION).to(Auction);
container.bind<ISalesman>(DependencyIdentifier.SALESMAN).to(Salesman);
container
  .bind<ICarOnSaleClient>(DependencyIdentifier.CARONSALE_CLIENT)
  .to(CarOnSaleClient);

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
