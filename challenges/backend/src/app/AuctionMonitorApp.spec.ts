// import {AuctionMonitorApp} from "./AuctionMonitorApp";
// import {Logger} from "./services/Logger/classes/Logger";
// import CarOnSaleClient from "./services/CarOnSaleClient/classes/CarOnSaleClient";
// import ApiClient from "./services/ApiClient/classes/ApiClient";
// import "reflect-metadata";
// import * as sinon from "sinon";
// import {expect} from "chai";
// import {IRunningAuctionListViewModel} from "./services/CarOnSaleClient/interface/IRunningAuctionListViewModel";
//
// describe("AuctionMonitorApp", () => {
//     let getRunningAuctionsStub: sinon.SinonStub;
//     const logger = new Logger();
//     const carOnSaleClient = new CarOnSaleClient(new ApiClient());
//
//     beforeEach(() => {
//         getRunningAuctionsStub = sinon.stub(carOnSaleClient, "getRunningAuctions");
//     });
//
//     afterEach(() => {
//         getRunningAuctionsStub.restore();
//     });
//
//     // todo: unfortunatelly I've failed to find a way to stub process.exit :(
//
//     it("should fetch the running auctions and exit with zero", () => {
//         getRunningAuctionsStub.returns(<IRunningAuctionListViewModel>{});
//
//         //when
//         const app = new AuctionMonitorApp(logger, carOnSaleClient);
//         app.start();
//
//         //then
//         expect(getRunningAuctionsStub.calledOnce).to.be.true;
//         expect(app.exitCode).to.be.equal(0);
//     });
//
//     it("should set the exit code to 1 on service fail", () => {
//         getRunningAuctionsStub.throws(new Error());
//
//         //when
//         const app = new AuctionMonitorApp(logger, carOnSaleClient);
//         app.start();
//
//         //then
//         expect(getRunningAuctionsStub.calledOnce).to.be.true;
//         expect(app.exitCode).to.be.equal(1);
//     });
// });