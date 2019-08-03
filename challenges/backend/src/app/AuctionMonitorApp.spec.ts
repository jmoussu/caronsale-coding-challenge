import {inject, Container, injectable} from "inversify";
import { equal, ok } from "assert";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised.default);

import {ILogger} from "./services/Logger/interface/ILogger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {CarOnSaleClient} from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import {IAuction} from "./services/CarOnSaleClient/interface/IAuction";
import {Auction} from "./services/CarOnSaleClient/classes/Auction";
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {fetchfn} from "./services/CarOnSaleClient/classes/AuthedFetch";
import * as fetch from "node-fetch";

@injectable()
class TestLogger implements ILogger {
    public constructor(
        @inject("allowed-messages") private messages: string[],
        private index: number = 0,
    ) { }

    public log(message: string): void {
        ok(this.index < this.messages.length,
            `superfluous message: ${message}`);
        equal(this.messages[this.index], message);
        this.index++;
    }
}

describe("AuctionMonitorApp test", () => {
    it("should return expected auction stats", async () => {
        const container = new Container({
            defaultScope: "Singleton",
        });

        container.bind<ICarOnSaleClient>(DependencyIdentifier.CLIENT).to(CarOnSaleClient);
        container.bind<IAuction>(DependencyIdentifier.AUCTION_CONSTRUCTOR).toConstructor(Auction);

        const list = [new Auction({
            currentHighestBidValue: 1234,
            minimumRequiredAsk: 789,
            numBids: 5,
        }), new Auction({
            currentHighestBidValue: 789,
            minimumRequiredAsk: 1234,
            numBids: 2,
        })];

        async function testFetch(url: fetch.RequestInfo, init?: fetch.RequestInit): Promise<fetch.Response> {
            equal(url, "auction/salesman/dumbo%40example.com/_all");
            equal(init.method, "GET");
            equal(init.body, null);
            return new fetch.Response(JSON.stringify(list));
        }

        container.bind<fetchfn>(DependencyIdentifier.AUTHED_FETCH).toFunction(testFetch);

        const messages: string[] = [
            "Auction Monitor started.",
            `count: ${list.length}`,
            `average bids: ${(5 + 2) / 2}`,
            `average progress: ${(1234 / 789 + 789 / 1234) / 2}`,
        ];
        container.bind<string[]>("allowed-messages").toConstantValue(messages);
        container.bind<ILogger>(DependencyIdentifier.LOGGER).to(TestLogger);

        const app = container.resolve(AuctionMonitorApp);

        await app.start("dumbo@example.com");
    });

    it("should return only auction count == 0", async () => {
        const container = new Container({
            defaultScope: "Singleton",
        });

        container.bind<ICarOnSaleClient>(DependencyIdentifier.CLIENT).to(CarOnSaleClient);
        container.bind<IAuction>(DependencyIdentifier.AUCTION_CONSTRUCTOR).toConstructor(Auction);

        const list = [];

        async function testFetch(url: fetch.RequestInfo, init?: fetch.RequestInit): Promise<fetch.Response> {
            equal(url, "auction/salesman/dumbo%40example.com/_all");
            equal(init.method, "GET");
            equal(init.body, null);
            return new fetch.Response(JSON.stringify(list));
        }

        container.bind<fetchfn>(DependencyIdentifier.AUTHED_FETCH).toFunction(testFetch);

        const messages: string[] = [
            "Auction Monitor started.",
            "count: 0",
        ];
        container.bind<string[]>("allowed-messages").toConstantValue(messages);
        container.bind<ILogger>(DependencyIdentifier.LOGGER).to(TestLogger);

        const app = container.resolve(AuctionMonitorApp);

        await app.start("dumbo@example.com");
    });

    it("should return expected auction stats with null miniumRequiredAsk", async () => {
        const container = new Container({
            defaultScope: "Singleton",
        });

        container.bind<ICarOnSaleClient>(DependencyIdentifier.CLIENT).to(CarOnSaleClient);
        container.bind<IAuction>(DependencyIdentifier.AUCTION_CONSTRUCTOR).toConstructor(Auction);

        const list = [new Auction({
            currentHighestBidValue: 1234,
            minimumRequiredAsk: null,
            numBids: 2,
        }), new Auction({
            currentHighestBidValue: null,
            minimumRequiredAsk: null,
            numBids: 0,
        })];

        async function testFetch(url: fetch.RequestInfo, init?: fetch.RequestInit): Promise<fetch.Response> {
            equal(url, "auction/salesman/dumbo%40example.com/_all");
            equal(init.method, "GET");
            equal(init.body, null);
            return new fetch.Response(JSON.stringify(list));
        }

        container.bind<fetchfn>(DependencyIdentifier.AUTHED_FETCH).toFunction(testFetch);

        const messages: string[] = [
            `Auction Monitor started.`,
            `count: ${list.length}`,
            `average bids: ${(2 + 0) / 2}`,
            `average progress: ${(1 + 0) / 2}`,
        ];
        container.bind<string[]>("allowed-messages").toConstantValue(messages);
        container.bind<ILogger>(DependencyIdentifier.LOGGER).to(TestLogger);

        const app = container.resolve(AuctionMonitorApp);

        await app.start("dumbo@example.com");
    });

    it("should fail, numBids > 0, currentHighestBidValue === null", async () => {
        const container = new Container({
            defaultScope: "Singleton",
        });

        container.bind<ICarOnSaleClient>(DependencyIdentifier.CLIENT).to(CarOnSaleClient);
        container.bind<IAuction>(DependencyIdentifier.AUCTION_CONSTRUCTOR).toConstructor(Auction);

        const list = [{
            currentHighestBidValue: null,
            minimumRequiredAsk: null,
            numBids: 1,
        }];

        async function testFetch(url: fetch.RequestInfo, init?: fetch.RequestInit): Promise<fetch.Response> {
            equal(url, "auction/salesman/dumbo%40example.com/_all");
            equal(init.method, "GET");
            equal(init.body, null);
            return new fetch.Response(JSON.stringify(list));
        }

        container.bind<fetchfn>(DependencyIdentifier.AUTHED_FETCH).toFunction(testFetch);

        const messages: string[] = [
            "Auction Monitor started.",
        ];
        container.bind<string[]>("allowed-messages").toConstantValue(messages);
        container.bind<ILogger>(DependencyIdentifier.LOGGER).to(TestLogger);

        const app = container.resolve(AuctionMonitorApp);

        await chai.expect(
            app.start("dumbo@example.com"),
        ).to.be.rejectedWith(Error, /^expected positive currentHighestBidValue, actual: null$/);

    });


    it("should fail, numBids === 0, currentHighestBidValue === 500", async () => {
        const container = new Container({
            defaultScope: "Singleton",
        });

        container.bind<ICarOnSaleClient>(DependencyIdentifier.CLIENT).to(CarOnSaleClient);
        container.bind<IAuction>(DependencyIdentifier.AUCTION_CONSTRUCTOR).toConstructor(Auction);

        const list = [{
            currentHighestBidValue: 500,
            minimumRequiredAsk: null,
            numBids: 0,
        }];

        async function testFetch(url: fetch.RequestInfo, init?: fetch.RequestInit): Promise<fetch.Response> {
            equal(url, "auction/salesman/dumbo%40example.com/_all");
            equal(init.method, "GET");
            equal(init.body, null);
            return new fetch.Response(JSON.stringify(list));
        }

        container.bind<fetchfn>(DependencyIdentifier.AUTHED_FETCH).toFunction(testFetch);

        const messages: string[] = [
            "Auction Monitor started.",
        ];
        container.bind<string[]>("allowed-messages").toConstantValue(messages);
        container.bind<ILogger>(DependencyIdentifier.LOGGER).to(TestLogger);

        const app = container.resolve(AuctionMonitorApp);

        await chai.expect(
            app.start("dumbo@example.com"),
        ).to.be.rejectedWith(Error, /^expected null currentHighestBidValue$/);

    });
});
