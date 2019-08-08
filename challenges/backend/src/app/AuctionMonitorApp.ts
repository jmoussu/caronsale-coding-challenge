import 'reflect-metadata';
import { inject, injectable, Container } from 'inversify';

import { ILogger } from './services/Logger/interface/ILogger';
import { Salesman, Auction } from './services/CarOnSaleClient/classes';
import { DependencyIdentifier } from './DependencyIdentifiers';
import CarOnSaleClient from './services/CarOnSaleClient/classes/CarOnSaleClient';

@injectable()
export class AuctionMonitorApp {
  private readonly email: string = 'salesman@random.com';
  private readonly password: string = '123test';
  private salesman: Salesman;

  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.CARONSALE_CLIENT)
    private cosClient: CarOnSaleClient,
  ) {}

  public async start(): Promise<void> {
    this.logger.log(`Auction Monitor started.`);

    // TODO: Retrieve auctions and display aggregated information (see README.md)
    try {
      this.salesman = new Salesman(
        this.email,
        this.password,
        this.cosClient,
      );

      const auctions: Auction[] = await this.salesman.getAllAuctions();
      const qtyOfAuctions: number = this.salesman.getQtyOfAuctions();
      const progressAvg: number = this.salesman.getAvgAuctionProgress();
      const avgBids: number = this.salesman.getAvgBids();

      this.logger.log(`Salesman:`, this.email);
      this.logger.log(`Quantity of Auctions:`, qtyOfAuctions);
      this.logger.log(`Avg bids:`, avgBids);
      this.logger.log(`Avg progress:`, progressAvg);
      this.logger.log(`Auctions:`, auctions);

      process.exit(0);
    } catch (error) {
      this.logger.log(`ERROR!`);
      this.logger.log(error);
      process.exit(1);
    }
  }
}
