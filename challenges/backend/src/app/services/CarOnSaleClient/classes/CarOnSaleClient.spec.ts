import { CarOnSaleClient } from "./CarOnSaleClient";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { AuctionItem } from "../models/AuctionItem";
import "reflect-metadata";

import chai from "chai";

const expect = chai.expect;

describe('CarOnSaleClient class test', function () {
    let client: ICarOnSaleClient;

    this.beforeEach(function(){
        client = new CarOnSaleClient();
    })

    it('Should return running auctions', function () {

        expect(client.getRunningAuctions()).to.not.throw();
        
    })
});