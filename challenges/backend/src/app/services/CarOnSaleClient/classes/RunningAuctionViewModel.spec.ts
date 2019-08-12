import {expect} from "chai";
import RunningAuctionViewModel from "./RunningAuctionViewModel";
import {IAuction} from "../../ApiClient/interface/IAuction";

describe("RunningAuctionViewModel", () => {
    const theories = [
        [2, 100, 200, 50],
        [0, 0, 200, 0], //no bids means no progress
        [1, 100, 0, 100], //minimumRequiredAsk = 0 and currentHighestBidValue>0 means 100% progress
        [1, 100, null, 100], //minimumRequiredAsk = null and currentHighestBidValue>0 means 100% progress?
    ];

    theories.forEach(([numBids, currentHighestBidValue, minimumRequiredAsk, expectedProgress], index) => {
        it(`should construct from IAuction and set properties ${index}`, () => {
            // given
            const auction = <IAuction>{
                id: Math.random(),
                numBids: numBids,
                currentHighestBidValue: currentHighestBidValue,
                minimumRequiredAsk: minimumRequiredAsk
            };

            //when
            const result = new RunningAuctionViewModel(auction);

            //then
            expect(result.id).to.be.equal(auction.id);
            expect(result.numBids).to.be.equal(auction.numBids);
            expect(result.progress).to.be.equal(expectedProgress);
        });
    });
});