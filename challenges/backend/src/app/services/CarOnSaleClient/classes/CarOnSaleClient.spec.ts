import {Container} from "inversify";
import { equal, deepEqual } from "assert";

import {ILogger} from "../../Logger/interface/ILogger";
import {Logger} from "../../Logger/classes/Logger";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import { CarOnSaleClient } from "./CarOnSaleClient";
import {IAuction} from "../interface/IAuction";
import {Auction} from "./Auction";
import {fetchfn} from "./AuthedFetch";
import * as fetch from "node-fetch";

describe("CarOnSaleClient test", () => {
    const container = new Container({
        defaultScope: "Singleton",
    });

    container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
    container.bind<IAuction>(DependencyIdentifier.AUCTION_CONSTRUCTOR).toConstructor(Auction);

    it("should return expected auction list", async () => {
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

        const client = container.resolve(CarOnSaleClient);

        const result = await client.getRunningAuctions("dumbo@example.com");
        deepEqual(result, list);
    });
});
