/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
import { AxiosResponse } from "axios";

export interface ICarOnSaleClient {

    getRunningAuctions(): Promise<AxiosResponse>;

}
