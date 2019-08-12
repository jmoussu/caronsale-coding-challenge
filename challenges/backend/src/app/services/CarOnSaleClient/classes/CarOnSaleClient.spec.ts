import * as sinon from "sinon";
import {expect} from "chai";
import CarOnSaleClient from "./CarOnSaleClient";
import ApiClient from "../../ApiClient/classes/ApiClient";
import {IAuthenticationResult} from "../../ApiClient/interface/IAuthenticationResult";

describe("CarOnSaleClient", () => {
    const apiService = new ApiClient();
    let authenticateStub: sinon.SinonStub;
    let getRunningAuctionsStub: sinon.SinonStub;
    let carOnSaleClient;

    const item1 = {currentHighestBidValue: 100, minimumRequiredAsk: 200, numBids: 2, id: 1};
    const item2 = {currentHighestBidValue: 0, minimumRequiredAsk: 100, numBids: 0, id: 2};
    const item3 = {currentHighestBidValue: 300, minimumRequiredAsk: 300, numBids: 3, id: 3};

    beforeEach("mock user repository", () => {
        authenticateStub = sinon.stub(apiService, "authenticateAsync");
        getRunningAuctionsStub = sinon.stub(apiService, "getRunningAuctionsAsync");
        carOnSaleClient = new CarOnSaleClient(apiService);
    });

    afterEach("restore stub", () => {
        authenticateStub.restore();
        getRunningAuctionsStub.restore();
    });

    it("should return list of running auction aggregates", async () => {
        //given
        authenticateStub.returns(<IAuthenticationResult>{authenticated: true});
        getRunningAuctionsStub.returns([item1, item2, item3]);

        //when
        const result = await carOnSaleClient.getRunningAuctions();

        //then
        expect(authenticateStub.calledOnce).to.be.true;
        expect(getRunningAuctionsStub.calledOnce).to.be.true;

        expect(result).to.be.not.null;
        expect(result.totalCount).to.equal(3);
        expect(result.items.length).to.equal(3);

        expect(result.items[0].id).to.be.equal(item1.id);
        expect(result.items[0].numBids).to.be.equal(item1.numBids);
        expect(result.items[0].progress).to.be.equal(50);

        expect(result.items[1].id).to.be.equal(item2.id);
        expect(result.items[1].numBids).to.be.equal(item2.numBids);
        expect(result.items[1].progress).to.be.equal(0);

        expect(result.items[2].id).to.be.equal(item3.id);
        expect(result.items[2].numBids).to.be.equal(item3.numBids);
        expect(result.items[2].progress).to.be.equal(100);
    });

    it("should throw error on failed authentication request", async () => {
        //given
        let result = null;
        let error = null;
        const expectedErrorMessage = "authentication request failed";

        authenticateStub.throws(new Error(expectedErrorMessage));
        getRunningAuctionsStub.returns([item1, item2, item3]);

        //when
        try {
            result = await carOnSaleClient.getRunningAuctions();
        } catch (e) {
            error = e;
        }

        //then
        expect(authenticateStub.calledOnce).to.be.true;
        expect(getRunningAuctionsStub.notCalled).to.be.true;

        expect(result).to.be.null;
        expect(error).to.not.null;
        expect(error.message).to.equal(expectedErrorMessage);
    });

    it("should throw error on failed running autions request", async () => {
        //given
        let result = null;
        let error = null;
        const expectedErrorMessage = "running auctions request failed";

        authenticateStub.returns(<IAuthenticationResult>{authenticated: true});
        getRunningAuctionsStub.throws(new Error(expectedErrorMessage));

        //when
        try {
            result = await carOnSaleClient.getRunningAuctions();
        } catch (e) {
            error = e;
        }

        //then
        expect(authenticateStub.calledOnce).to.be.true;
        expect(getRunningAuctionsStub.calledOnce).to.be.true;

        expect(error).to.not.null;
        expect(error.message).to.equal(expectedErrorMessage);
    })
});