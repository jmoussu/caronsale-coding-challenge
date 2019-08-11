import CarOnSaleClient from "./CarOnSaleClient";
import {expect} from "chai";
import {IRunningAuctionListViewModel} from "../interface/ViewModels";

describe("CarOnSaleClient", () => {
    it("should return list of running auction aggregates", async () => {
        const carOnSaleClient = new CarOnSaleClient();
        const result: IRunningAuctionListViewModel = await carOnSaleClient.getRunningAuctions();

        expect(result).to.be.not.null;
        expect(result.totalCount).to.equal(1);
        expect(result.items.length).to.equal(1);
    });
});