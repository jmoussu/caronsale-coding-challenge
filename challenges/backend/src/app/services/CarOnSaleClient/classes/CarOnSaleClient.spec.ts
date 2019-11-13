import { CarOnSaleClient } from "./CarOnSaleClient";
import { assert } from 'chai';
import { AxiosResponse } from "axios";

const MyCarOnSaleClient = new CarOnSaleClient();

describe('CarOnSaleClient', () => {
    let runningAuctions: AxiosResponse;
    let data: [];
    it('should return type number', async () => {
        runningAuctions = await MyCarOnSaleClient.getRunningAuctions();
        data = runningAuctions.data;
        data.forEach((element: { numBids: number, currentHighestBidValue: number, minimumRequiredAsk: number }) => {
            assert.typeOf(element.numBids, 'number');
            assert.typeOf(element.currentHighestBidValue, 'number');
            assert.typeOf(element.minimumRequiredAsk, 'number');
        });
    });
});
