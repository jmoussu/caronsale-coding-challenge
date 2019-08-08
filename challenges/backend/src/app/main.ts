import { Container, interfaces } from 'inversify';

import { ILogger } from './services/Logger/interface/ILogger';
import {
  IAuction,
  ISalesman,
  ICarOnSaleClient,
} from './services/CarOnSaleClient/interfaces';
import { IAPIClient } from './services/APIClient/interfaces';

import {
  Auction,
  Salesman,
  CarOnSaleClient,
} from './services/CarOnSaleClient/classes';
import { Logger } from './services/Logger/classes/Logger';
import { APIClient } from './services/APIClient/classes';

import { AuctionMonitorApp } from './AuctionMonitorApp';
import { DependencyIdentifier } from './DependencyIdentifiers';

/*
 * Create the DI container.
 */
const container = new Container({
  defaultScope: 'Singleton',
});

/*
 * Register dependencies in DI environment.
 */
container.bind<IAPIClient>(DependencyIdentifier.API_CLIENT).to(APIClient);
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IAuction>(DependencyIdentifier.AUCTION).to(Auction);
container.bind<ISalesman>(DependencyIdentifier.SALESMAN).to(Salesman);
container
  .bind<ICarOnSaleClient>(DependencyIdentifier.CARONSALE_CLIENT)
  .to(CarOnSaleClient);

// Injecting ILogger on the fly
container.bind<ILogger>(Logger).toSelf();

// Declaring a personalizable constructor
container
  .bind<interfaces.Newable<IAPIClient>>(
    `Newable<${DependencyIdentifier.API_CLIENT}>`
  )
  .toConstructor<IAPIClient>(APIClient);

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
