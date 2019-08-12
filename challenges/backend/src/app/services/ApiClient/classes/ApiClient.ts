import axios from "axios";
import "reflect-metadata";
import {injectable} from "inversify";
import {hash} from "../../../infrastructure/Utils";
import {config} from 'node-config-ts';
import {IApiClient} from "../interface/IApiClient";
import {IAuthenticationResult} from "../interface/IAuthenticationResult";
import {IAuthenticationRequest} from "../interface/IAuthenticationRequest";
import {IAuction} from "../interface/IAuction";

@injectable()
export default class ApiClient implements IApiClient {
    api = axios.create({
        baseURL: config.baseUrl
    });

    async authenticateAsync(userId: string, password: string): Promise<IAuthenticationResult> {
        const path: string = `authentication/${userId}`;
        const passwordHash = hash(password, config.defaultHashCycles);
        const result = await this.api.put<IAuthenticationResult>(path, <IAuthenticationRequest>{password: passwordHash}, {});
        return result.data;
    }

    async getRunningAuctionsAsync(userId: string, token: string): Promise<Array<IAuction>> {
        const path: string = `auction/salesman/${userId}/_all`;
        const config: Axios.AxiosXHRConfigBase<Array<IAuction>> = {
            headers: {
                userId: userId,
                authtoken: token
            }
        };
        const result = await this.api.get<Array<IAuction>>(path, config);
        return result.data;
    }
}