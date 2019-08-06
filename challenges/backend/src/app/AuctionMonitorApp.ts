import 'reflect-metadata';
import { inject, injectable, Container } from 'inversify';

import { ILogger } from './services/Logger/interface/ILogger';
import { Salesman } from './services/CarOnSaleClient/classes';
import { DependencyIdentifier } from './DependencyIdentifiers';
import CarOnSaleClient from './services/CarOnSaleClient/classes/CarOnSaleClient';

@injectable()
export class AuctionMonitorApp {
  private readonly _email: string = 'salesman@random.com';
  private readonly _password: string = '123test';
  private salesman: Salesman;

  public constructor(
    @inject(DependencyIdentifier.LOGGER) private _logger: ILogger,
    @inject(DependencyIdentifier.CARONSALE_CLIENT)
    private _cosclient: CarOnSaleClient
  ) {}

  public async start(): Promise<void> {
    this._logger.log(`Auction Monitor started.`);

    // TODO: Retrieve auctions and display aggregated information (see README.md)
    try {
      this.salesman = new Salesman(
        this._email,
        this._password,
        this._cosclient
      );
      await this.salesman.retrieveAuctions();
      const progressAvg: number = this.salesman.getAvgAuctionProgress();
      const avgBids: number = this.salesman.getAvgBids();

      this._logger.log(`${avgBids}`);
      this._logger.log(`${progressAvg}`);

      process.exit(0);
    } catch (error) {
      this._logger.log(`ERROR!`);
      this._logger.log(error)
      process.exit(1);
    }
  }
}
