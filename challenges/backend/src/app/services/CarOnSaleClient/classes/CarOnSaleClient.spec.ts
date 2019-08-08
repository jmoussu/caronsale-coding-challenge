import mocha from 'mocha';
import chai from 'chai';

import CarOnSaleClient from './CarOnSaleClient';
import { ILoginResponseType } from '../interfaces';
import { Logger } from '../../Logger/classes/Logger';
import APIClient from '../../APIClient/classes/APIClient';

const { expect } = chai;

/* tslint:disable: no-unused-expression */
describe('Test Suite for CarOnSaleClient Class', () => {
  function compareObjects(target: any, source: any): void {
    Object.keys(target).forEach((key) => {
      expect(target[key]).itself.be.equal(
        source[key],
        `${key} in target should be equal to ${key} in source`,
      );
    });
  }

  it('Should instatiate a class from CarOnSaleClient constructor', () => {
    const logger: Logger = new Logger();

    const carOnSaleClient: CarOnSaleClient = new CarOnSaleClient(
      logger,
      APIClient,
    );

    expect(carOnSaleClient).to.be.instanceOf(
      CarOnSaleClient,
      'Should be an instance of CarOnSale class',
    );
  });

  it('Should instatiate a class from CarOnSaleClient constructor and return a hashed string', () => {
    const logger: Logger = new Logger();
    const randomString: string = 'randomString';

    const carOnSaleClient: CarOnSaleClient = new CarOnSaleClient(
      logger,
      APIClient,
    );

    const hashedString: string = carOnSaleClient.hashString(randomString, 5);

    expect(carOnSaleClient).to.be.instanceOf(
      CarOnSaleClient,
      'Should be an instance of CarOnSale class',
    );

    expect(hashedString).to.be.not.null;
    expect(hashedString).to.be.not.undefined;
    expect(hashedString).to.be.not.equal(randomString);
  });

  it('Should instatiate a class from CarOnSaleClient constructor and login a salesman', async () => {
    const logger: Logger = new Logger();
    const email: string = 'salesman@random.com';
    const password: string = '123test';

    const carOnSaleClient: CarOnSaleClient = new CarOnSaleClient(
      logger,
      APIClient,
    );

    const hashedString: string = carOnSaleClient.hashString(password, 5);
    const loginResult: ILoginResponseType = await carOnSaleClient.loginSalesman(
      email,
      hashedString,
    );

    expect(carOnSaleClient).to.be.instanceOf(
      CarOnSaleClient,
      'Should be an instance of CarOnSale class',
    );

    expect(hashedString).to.be.not.null;
    expect(hashedString).to.be.not.undefined;
    expect(hashedString).to.be.not.equal(password);
    expect(loginResult).to.not.be.undefined;
    expect(loginResult.token).to.be.string;
    expect(loginResult.userid).to.be.string;
  });

  it('Should instatiate a class from CarOnSaleClient constructor and retrieve auctions from the server', async () => {
    const logger: Logger = new Logger();
    const email: string = 'salesman@random.com';
    const password: string = '123test';

    const carOnSaleClient: CarOnSaleClient = new CarOnSaleClient(
      logger,
      APIClient,
    );

    const hashedString: string = carOnSaleClient.hashString(password, 5);
    const loginResult: ILoginResponseType = await carOnSaleClient.loginSalesman(
      email,
      hashedString,
    );
    const auctions: any[] = await carOnSaleClient.getRunningAuctions(
      email,
      loginResult.userid,
      loginResult.token,
    );

    expect(carOnSaleClient).to.be.instanceOf(
      CarOnSaleClient,
      'Should be an instance of CarOnSale class',
    );

    expect(hashedString).to.be.not.null;
    expect(hashedString).to.be.not.undefined;
    expect(hashedString).to.be.not.equal(password);
    expect(loginResult).to.not.be.undefined;
    expect(loginResult.token).to.be.string;
    expect(loginResult.userid).to.be.string;
    expect(auctions).to.not.be.undefined;
    expect(auctions).to.be.an(
      'Array',
      'The Auctions retrieved should be an Array',
    );
  });
});
