import {expect} from "chai";
import RunningAuctionViewModel from "./RunningAuctionViewModel";
import {IAuction} from "../../ApiClient/interface/IAuction";
import RunningAuctionListViewModel from "./RunningAuctionListViewModel";

describe("RunningAuctionViewModel", () => {
    it("should construct from list of IAuction items", () => {
        //given
        const auction1: IAuction = {id: 1, numBids: 0, minimumRequiredAsk: 100, currentHighestBidValue: 0};
        const auction2: IAuction = {id: 2, numBids: 2, minimumRequiredAsk: 66, currentHighestBidValue: 33}
        const auctions: Array<IAuction> = [auction1, auction2];

        //when
        const result = new RunningAuctionListViewModel(auctions);

        //then
        expect(result.totalCount).to.be.equal(2);
        expect(result.items.length).to.be.equal(2);

        expect(result.items[0].id).to.be.equal(auction1.id);
        expect(result.items[0].numBids).to.be.equal(auction1.numBids);
        expect(result.items[0].progress).to.be.equal(0);

        expect(result.items[1].id).to.be.equal(auction2.id);
        expect(result.items[1].numBids).to.be.equal(auction2.numBids);
        expect(result.items[1].progress).to.be.equal(50);
    });
});