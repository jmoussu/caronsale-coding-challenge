import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {Auction} from "./Auction";
import {ServiceSettings} from "./ServiceSettings";
import {injectable} from "inversify";
import "reflect-metadata";
import {sha512} from 'js-sha512';
import * as request from 'superagent';

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    private static hashPasswordWithCycles(plainTexPassword: string, cycles: number): string {
        let hash = `${plainTexPassword}`;

        for(let i = 0; i < cycles; i++) {
            hash = sha512(hash);
        }
        return hash;
    }

    public async getRunningAuctions(): Promise<Auction[]> {
        // authenticate salesman
        const hashPassword = CarOnSaleClient.hashPasswordWithCycles(ServiceSettings.PLAINTEXTPASSWORD, ServiceSettings.CYCLES);
        const authenticationResponse = await request
            .put(`${ServiceSettings.CARONSALEAPI}/authentication/${ServiceSettings.USERMAILID}`)
            .send({password: hashPassword, meta: "userId"})
            .set('accept','application/json')
            .set('Content-Type','application/json');
        if(authenticationResponse && authenticationResponse.status !== 201) {
            return Promise.resolve(null);
        }
        const token = authenticationResponse.body.token;
        const userId = authenticationResponse.body.userId;

        // call CARONSALE API to get running auctions
        const header = {
            "content-type": "application/json",
            "userid": userId,
            "authtoken":token,
        };
        const response = await request
            .get(`${ServiceSettings.CARONSALEAPI}/auction/salesman/${ServiceSettings.USERMAILID}/_all?state=running`)
            .set(header);
        if(response && response.status !== 200) {
            return Promise.resolve(null);
        }
        const auctions = response.body;

        // prepare the list of auctions
        const listAuctions = auctions.map((element) => {
            const auction = new Auction(element.numBids, element.minimumRequiredAsk, element.currentHighestBidValue, auctions.length);
            return auction;
        });
        return Promise.resolve(listAuctions);
    }
}
