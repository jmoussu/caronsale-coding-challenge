import { CarOnSaleClient } from "./CarOnSaleClient";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import "reflect-metadata";

var expect = require('chai').expect;

describe('CarOnSaleClient class test', function () {
    let client: ICarOnSaleClient;

    this.beforeEach(function(){
        client = new CarOnSaleClient();
    })

    it('Should return running auctions', function () {
        expect(client.getRunningAuctions()).to.not.throw();
        
    })
});