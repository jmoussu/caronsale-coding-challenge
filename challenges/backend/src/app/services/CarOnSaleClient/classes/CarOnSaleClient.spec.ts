import mocha from 'mocha';
import chai from 'chai';

import CarOnSaleClient from './CarOnSaleClient';
import { Logger } from '../../Logger/classes/Logger';
import APIClient from '../../APIClient/classes/APIClient';

const { expect } = chai;

describe('Test Suite for CarOnSaleClient Class', () => {
  function compareObjects(target: any, source: any): void {
    Object.keys(target).forEach(key => {
      expect(target[key]).itself.be.equal(
        source[key],
        `${key} in target should be equal to ${key} in source`
      );
    });
  }

  function calculateProgress(
    currentHighestBidValue: number,
    minimumRequiredAsk: number
  ): number {
    const rawResult: number =
      (currentHighestBidValue * 100) / minimumRequiredAsk;
    const rawResultAsString: string = rawResult.toFixed(2);

    const result: number = parseFloat(rawResultAsString);

    return result;
  }

  it('Should instatiate a class from CarOnSaleClient constructor', () => {
    const logger: Logger = new Logger();

    const carOnSaleClient: CarOnSaleClient = new CarOnSaleClient(
      logger,
      APIClient
    );

    expect(carOnSaleClient).to.be.instanceOf(
      CarOnSaleClient,
      'Should be an instance of Auction class'
    );
  });
});
