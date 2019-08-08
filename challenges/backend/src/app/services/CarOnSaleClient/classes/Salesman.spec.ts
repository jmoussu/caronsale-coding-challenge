import mocha from 'mocha';
import chai from 'chai';

import Auction from './Auction';
import Salesman from './Salesman';
import CarOnSaleClient from './CarOnSaleClient';
import { Logger } from '../../Logger/classes/Logger';
import APIClient from '../../APIClient/classes/APIClient';

const { expect } = chai;

/* tslint:disable: no-unused-expression */
describe('Test Suite for Salesman Class', () => {
  const email: string = 'salesman@random.com';
  const password: string = '123test';
  const sampleAuctionId: number = 5444;
  const totalAvgBids: number = 0.75;
  const totalAvgProgress: number = 25.25;
  const totalAuctions: number = 8;

  const cosClient: CarOnSaleClient = new CarOnSaleClient(
    new Logger(),
    APIClient,
  );

  it('Should instatiate a class from Salesman constructor', () => {
    const salesman: Salesman = new Salesman(email, password, cosClient);

    expect(salesman).to.be.instanceOf(
      Salesman,
      'Should be an instance of Salesman class',
    );
  });

  it('Should instatiate a class from Salesman constructor and retrieve all the Auctions', async () => {
    const salesman: Salesman = new Salesman(email, password, cosClient);

    const auctions: Auction[] = await salesman.getAllAuctions();

    expect(salesman).to.be.instanceOf(
      Salesman,
      'Should be an instance of Salesman class',
    );

    auctions.forEach((auction) => expect(auction).to.be.instanceOf(Auction));
  });

  it('Should instatiate a class from Salesman constructor and get an specific auction', async () => {
    const salesman: Salesman = new Salesman(email, password, cosClient);

    const auctions: Auction[] = await salesman.getAllAuctions();
    const auction: Auction = await salesman.getAnAuction(sampleAuctionId);

    expect(salesman).to.be.instanceOf(
      Salesman,
      'Should be an instance of Salesman class',
    );

    auctions.forEach((auctionInArray) => expect(auctionInArray).to.be.instanceOf(Auction));
    expect(auction).to.not.be.undefined;
    expect(auction).to.be.instanceOf(Auction);
  });

  it('Should instatiate a class from Salesman constructor and get Avg Bids per Auction', async () => {
    const salesman: Salesman = new Salesman(email, password, cosClient);

    const auctions: Auction[] = await salesman.getAllAuctions();
    const auction: Auction = await salesman.getAnAuction(sampleAuctionId);
    const avgBids: number = salesman.getAvgBids();

    expect(salesman).to.be.instanceOf(
      Salesman,
      'Should be an instance of Salesman class',
    );

    auctions.forEach((auctionInArray) => expect(auctionInArray).to.be.instanceOf(Auction));
    expect(auction).to.not.be.undefined;
    expect(auction).to.be.instanceOf(Auction);
    expect(avgBids).to.not.be.undefined;
    expect(avgBids).to.be.equal(totalAvgBids);
  });

  it('Should instatiate a class from Salesman constructor and get Avg progress per Auction', async () => {
    const salesman: Salesman = new Salesman(email, password, cosClient);

    const auctions: Auction[] = await salesman.getAllAuctions();
    const auction: Auction = await salesman.getAnAuction(sampleAuctionId);
    const avgBids: number = salesman.getAvgBids();
    const avgProgress: number = salesman.getAvgAuctionProgress();

    expect(salesman).to.be.instanceOf(
      Salesman,
      'Should be an instance of Salesman class',
    );

    auctions.forEach((auctionInArray) => expect(auctionInArray).to.be.instanceOf(Auction));
    expect(auction).to.not.be.undefined;
    expect(auction).to.be.instanceOf(Auction);
    expect(avgBids).to.not.be.undefined;
    expect(avgBids).to.be.equal(totalAvgBids);
    expect(avgProgress).to.not.be.undefined;
    expect(avgProgress).to.be.equal(totalAvgProgress);
  });

  it('Should instatiate a class from Salesman constructor and get the total of Auctions of the Salesman', async () => {
    const salesman: Salesman = new Salesman(email, password, cosClient);

    const auctions: Auction[] = await salesman.getAllAuctions();
    const auction: Auction = await salesman.getAnAuction(sampleAuctionId);
    const avgBids: number = salesman.getAvgBids();
    const avgProgress: number = salesman.getAvgAuctionProgress();
    const qtyAuctions: number = salesman.getQtyOfAuctions();

    expect(salesman).to.be.instanceOf(
      Salesman,
      'Should be an instance of Salesman class',
    );

    auctions.forEach((auctionInArray) => expect(auctionInArray).to.be.instanceOf(Auction));
    expect(auction).to.not.be.undefined;
    expect(auction).to.be.instanceOf(Auction);
    expect(avgBids).to.not.be.undefined;
    expect(avgBids).to.be.equal(totalAvgBids);
    expect(avgProgress).to.not.be.undefined;
    expect(avgProgress).to.be.equal(totalAvgProgress);
    expect(qtyAuctions).to.not.be.undefined;
    expect(qtyAuctions).to.be.equal(totalAuctions);
  });
});
