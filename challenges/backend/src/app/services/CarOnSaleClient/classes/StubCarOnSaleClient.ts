import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {Auction} from "./Auction";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class StubCarOnSaleClient implements ICarOnSaleClient {
    public static fail = 0;
    public getRunningAuctions(): Promise<Auction[]> {
        if(StubCarOnSaleClient.fail)  {
            return Promise.resolve(null);
        }
        const auctions: Auction[] = [new Auction(1,0,0,2), new Auction(2,10,1,2)];
        return Promise.resolve(auctions);
    }
}
