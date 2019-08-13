import { ICarOnSaleClient } from '../interface/ICarOnSaleClient';
import { injectable } from "inversify";
import request from "request-promise"
import { PasswordHelper } from "./passwordHelper";
import { AuctionItem } from '../models/AuctionItem';

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    private userId: string;
    private token: string;

    public constructor() {
    }

    async getRunningAuctions(): Promise<AuctionItem[]> {

        await this.authenticate();

        return request({
            method: "GET",
            uri: "https://caronsale-backend-service-dev.herokuapp.com/api/v1/auction/salesman/salesman@random.com/_all",
            json: true,
            headers: {
                userid: this.userId,
                authtoken: this.token
            }
        })
            .then((response: any) => {
                let auctionItems: AuctionItem[] = [];
                response.forEach(element => {
                    const item = new AuctionItem(element.currentHighestBidValue, element.numBids, element.minimunRequiredAsk || 0);
                    auctionItems.push(item);
                });

                return auctionItems;
            });
    }

    private async authenticate() {
        let passwordHelper = new PasswordHelper()

        await request({
            method: "PUT",
            uri: "https://caronsale-backend-service-dev.herokuapp.com/api/v1/authentication/salesman@random.com",
            json: true,
            body: {
                password: passwordHelper.hashPasswordsWithCycles("123test", 5)
            }
        })
            .then(response => {
                this.userId = response.userId;
                this.token = response.token;
            });
    }

}