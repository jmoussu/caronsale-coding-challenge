import { AuctionItem } from "../models/AuctionItem";

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {

    getRunningAuctions(): Promise<AuctionItem[]>

}