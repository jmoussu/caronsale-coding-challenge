import {inject, injectable, interfaces} from "inversify";
import {ILogger} from "../../Logger/interface/ILogger";
import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import "reflect-metadata";
import {createHash} from "crypto";
import {IAuction} from "../interface/IAuction";
import {fetchfn} from "./AuthedFetch";
import * as jwt from "jsonwebtoken";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.AUCTION_CONSTRUCTOR) private Auction: interfaces.Newable<IAuction>,
        @inject(DependencyIdentifier.AUTHED_FETCH) private fetch: fetchfn,
    ) { }

    public async getRunningAuctions(): Promise<IAuction[]> {
        const user = encodeURIComponent("salesman@random.com");
        const headers = {
            "Accept": "application/json",
            "User-Agent": "caronsale-coding-challenge",
        };

        const response = await this.fetch("auction/salesman/" + user + "/_all", {
            method: "GET",
            headers,
        });
        const list = await response.json();

        return list.map((auction: object) => new this.Auction(auction));
    }

}
