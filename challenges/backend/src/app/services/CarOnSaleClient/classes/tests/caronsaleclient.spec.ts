import * as chai from "chai";
import * as sinon from "sinon";
import {StubCarOnSaleClient} from "../StubCarOnSaleClient";
import {RunningAuctionsService} from "../RunningAuctionsService";
import {Auction} from "../Auction";
import "mocha-sinon";

const expect = chai.expect;
const expectedRunningAuctions = 2;
const mockAuctions: Auction[] = [new Auction(1,0,0,2), new Auction(2,10,1,2)];

describe("Get running auctions", () => {
    const logger = {
        log: sinon.spy(),
    };
    context("when running auction services fail",() => {
        let exitCode;
        beforeEach(async () => {
            const stubCarOnSale = new StubCarOnSaleClient();
            const runningAuctionsService = new RunningAuctionsService();
            StubCarOnSaleClient.fail = 1;
            runningAuctionsService.setCarOnSaleClient(stubCarOnSale);
            exitCode = await runningAuctionsService.displayInformation(logger);
        });
        it("should return exit code value -1", () => {
            expect(exitCode).to.equal(-1);
        });
    });
    context("when running auction services run", () => {
        let exitCode;
        const runningAuctionsService = new RunningAuctionsService();
        beforeEach(async () => {
            const stubCarOnSale = new StubCarOnSaleClient();
            StubCarOnSaleClient.fail = 0;
            runningAuctionsService.setCarOnSaleClient(stubCarOnSale);
            exitCode = await runningAuctionsService.displayInformation(logger);

        });
        it("should return exit code value 0", () => {
            expect(exitCode).to.equal(0);
        });
        it("should display the number of auctions", () => {
            expect(logger.log.called).to.equal(true);
            expect(logger.log.firstCall.args[0]).to.equal(`number of auctions: ${expectedRunningAuctions}`);
        });
        it("should return the average number of bids on an auction and the average percentage of the auction progress", () => {
            for(let i = 0; i < mockAuctions.length; i++) {
                expect(logger.log.calledWith(`average number of bids on auction ${i}: ${mockAuctions[i].getAvgNumberBids()}`)).to.equal(true);
                expect(logger.log.calledWith(`average percentage of auction ${i} progress: ${mockAuctions[i].getAvgPercentAuctionsProgress()}`)).to.equal(true);
            }
        });
    });
});
