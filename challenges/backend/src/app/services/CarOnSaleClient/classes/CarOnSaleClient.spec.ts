import "reflect-metadata"
import { CarOnSaleClient } from "./CarOnSaleClient";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import assertArrays from "chai-arrays";
import chai from "chai";

const expect = chai.expect;


describe('CarOnSaleClient class test', function () {
    let client: ICarOnSaleClient;

    this.beforeAll(function () {
        chai.use(assertArrays);
    })

    this.beforeEach(function () {
        client = new CarOnSaleClient();
    })

    it('Should not return null', function () {

        client.getRunningAuctions()
            .then(auctions => {
                expect(auctions)
                    .to.not.be.null
            });

    });

    it('Should return array of running auctions', function () {

        client.getRunningAuctions()
            .then(auctions => {
                expect(auctions)
                    .to.be.array()
            });

    });
});