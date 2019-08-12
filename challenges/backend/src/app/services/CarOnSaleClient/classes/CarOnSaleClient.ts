import "reflect-metadata";
import {config} from 'node-config-ts';
import {inject, injectable} from "inversify";
import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import {IApiClient} from "../../ApiClient/interface/IApiClient";
import {IRunningAuctionListViewModel} from "../interface/IRunningAuctionListViewModel";
import RunningAuctionListViewModel from "./RunningAuctionListViewModel";

@injectable()
export default class CarOnSaleClient implements ICarOnSaleClient {
    public constructor(@inject(DependencyIdentifier.API_CLIENT) private client: IApiClient) {
    }

    async getRunningAuctions(): Promise<IRunningAuctionListViewModel> {
        const authenticationResult = await this.client.authenticateAsync(config.defaultUserId, config.defaultPassword);
        if (authenticationResult != null && authenticationResult.authenticated) {
            const runningAuctions = await this.client.getRunningAuctionsAsync(authenticationResult.userId, authenticationResult.token);
            return new RunningAuctionListViewModel(runningAuctions);
        }
    }
}