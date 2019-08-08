import mocha from 'mocha';
import chai from 'chai';

import { IAuctionInitialData } from '../interfaces';
import Auction from './Auction';

const { expect } = chai;

describe('Test Suite for Auction Class', () => {
  function compareObjects(target: any, source: any): void {
    const sourceKeys: string[] = Object.keys(source);

    Object.keys(target).forEach((key) => {
      expect(target[key]).itself.be.equal(
        source[key],
        `${key} in target should be equal to ${key} in source`,
      );
    });
  }

  function calculateProgress(
    currentHighestBidValue: number,
    minimumRequiredAsk: number,
  ): number {
    const rawResult: number =
      (currentHighestBidValue * 100) / minimumRequiredAsk;
    const rawResultAsString: string = rawResult.toFixed(2);

    const result: number = parseFloat(rawResultAsString);

    return result;
  }

  it('Should instatiate a class from Auction constructor', () => {
    const testData: IAuctionInitialData = {
      id: 1,
      currentHighestBidValue: 520,
      minimumRequiredAsk: 5500,
      numBids: 3,
    };

    const auction: Auction = new Auction(testData);

    expect(auction).to.be.instanceOf(
      Auction,
      'Should be an instance of Auction class',
    );
  });

  it('Should instatiate a class from Auction constructor and the values should be the same', () => {
    const testData: IAuctionInitialData = {
      id: 1,
      currentHighestBidValue: 520,
      minimumRequiredAsk: 5500,
      numBids: 3,
    };

    const privateTestData: any = Object.keys(testData).reduce((obj, key) => {
      obj[`${key}`] = testData[key];

      return obj;
    }, {});
    privateTestData.auctionProgress = calculateProgress(520, 5500);

    const auction: Auction = new Auction(testData);

    expect(auction).to.be.instanceOf(
      Auction,
      'Should be an instance of Auction class',
    );

    compareObjects(auction, privateTestData);
  });

  it('Should instatiate a class from Auction constructor and getAuctionProgress should be exact', () => {
    const testData: IAuctionInitialData = {
      id: 1,
      currentHighestBidValue: 100,
      minimumRequiredAsk: 1000,
      numBids: 3,
    };

    const privateTestData: any = Object.keys(testData).reduce((obj, key) => {
      obj[`${key}`] = testData[key];

      return obj;
    }, {});
    privateTestData.auctionProgress = calculateProgress(100, 1000);

    const auction: Auction = new Auction(testData);
    const auctionProgress: number = auction.getAuctionProgress();

    expect(auction).to.be.instanceOf(
      Auction,
      'Should be an instance of Auction class',
    );

    compareObjects(auction, privateTestData);

    expect(auctionProgress).to.be.equal(10);
    expect(privateTestData.auctionProgress).to.be.equal(10);
  });

  it('Should instatiate a class from Auction constructor and compareId should be true', () => {
    const testData: IAuctionInitialData = {
      id: 1,
      currentHighestBidValue: 100,
      minimumRequiredAsk: 1000,
      numBids: 3,
    };

    const privateTestData: any = Object.keys(testData).reduce((obj, key) => {
      obj[`${key}`] = testData[key];

      return obj;
    }, {});
    privateTestData.auctionProgress = calculateProgress(100, 1000);

    const auction: Auction = new Auction(testData);
    const auctionProgress: number = auction.getAuctionProgress();
    const isSameID: boolean = auction.compareId(testData.id);

    expect(auction).to.be.instanceOf(
      Auction,
      'Should be an instance of Auction class',
    );

    compareObjects(auction, privateTestData);

    expect(auctionProgress).to.be.equal(10);
    expect(privateTestData.auctionProgress).to.be.equal(10);
    // tslint:disable-next-line: no-unused-expression
    expect(isSameID).to.be.true;
  });

  it('Should instatiate a class from Auction constructor and compareId should be false', () => {
    const testData: IAuctionInitialData = {
      id: 1,
      currentHighestBidValue: 100,
      minimumRequiredAsk: 1000,
      numBids: 3,
    };

    const privateTestData: any = Object.keys(testData).reduce((obj, key) => {
      obj[`${key}`] = testData[key];

      return obj;
    }, {});
    privateTestData.auctionProgress = calculateProgress(100, 1000);

    const auction: Auction = new Auction(testData);
    const auctionProgress: number = auction.getAuctionProgress();
    const isSameID: boolean = auction.compareId(2);

    expect(auction).to.be.instanceOf(
      Auction,
      'Should be an instance of Auction class',
    );

    compareObjects(auction, privateTestData);

    expect(auctionProgress).to.be.equal(10);
    expect(privateTestData.auctionProgress).to.be.equal(10);
    // tslint:disable-next-line: no-unused-expression
    expect(isSameID).to.be.false;
  });

  it('Should instatiate a class from Auction constructor and getTotalBids should be equal to testData.numBids', () => {
    const testData: IAuctionInitialData = {
      id: 1,
      currentHighestBidValue: 100,
      minimumRequiredAsk: 1000,
      numBids: 3,
    };

    const privateTestData: any = Object.keys(testData).reduce((obj, key) => {
      obj[`${key}`] = testData[key];

      return obj;
    }, {});
    privateTestData.auctionProgress = calculateProgress(100, 1000);

    const auction: Auction = new Auction(testData);
    const auctionProgress: number = auction.getAuctionProgress();
    const isSameID: boolean = auction.compareId(testData.id);
    const totalBids: number = auction.getTotalBids();

    expect(auction).to.be.instanceOf(
      Auction,
      'Should be an instance of Auction class',
    );

    compareObjects(auction, privateTestData);

    expect(auctionProgress).to.be.equal(10);
    expect(privateTestData.auctionProgress).to.be.equal(10);
    // tslint:disable-next-line: no-unused-expression
    expect(isSameID).to.be.true;
    expect(totalBids).to.be.equal(testData.numBids);
  });
});
