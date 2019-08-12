import {IAuthenticationResult} from "./IAuthenticationResult";
import {IAuction} from "./IAuction";

export interface IApiClient {
    authenticateAsync(userId: string, password: string): Promise<IAuthenticationResult>;

    getRunningAuctionsAsync(userId: string, token: string): Promise<Array<IAuction>>;
}