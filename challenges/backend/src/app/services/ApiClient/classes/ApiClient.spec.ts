import {expect} from "chai";
import ApiClient from "./ApiClient";
import {config} from 'node-config-ts';
import {hash} from "../../../infrastructure/Utils";
import {IAuthenticationResult} from "../interface/IAuthenticationResult";
import nock from "nock";
import {IAuthenticationRequest} from "../interface/IAuthenticationRequest";
import {IRunningAuctionListViewModel} from "../../CarOnSaleClient/interface/ViewModels";
import {IApiClient} from "../interface/IApiClient";

describe("ApiClient", () => {
    let client: IApiClient;
    beforeEach(() => {
        client = new ApiClient();
    });

    it("should call the authentication endpoint and return result", async () => {
        //given
        const userId: string = "userId";
        const password: string = "password";
        const token: string = "token";
        const scope = nock(config.baseUrl)
            .put('/authentication/userId', <IAuthenticationRequest>{password: hash(password, config.defaultHashCycles)})
            .reply(200, <IAuthenticationResult>{
                authenticated: true,
                token: token,
                userId: userId,
            });

        //when
        const result = await client.authenticateAsync(userId, password);

        //then
        expect(result).to.be.not.null;
        expect(result.userId).to.be.equal(userId);
        expect(result.token).to.be.equal(token);
        expect(result.authenticated).to.be.equal(true);
    });

    it("should call the authentication endpoint and throw error om bad response code", async () => {
        //given
        const userId: string = "userId";
        const password: string = "password";
        const token: string = "token";
        const scope = nock(config.baseUrl)
            .put('/authentication/userId', <IAuthenticationRequest>{password: hash(password, config.defaultHashCycles)})
            .reply(401, <IAuthenticationResult>{
                authenticated: true,
                token: token,
                userId: userId,
            });
        let error = null;

        //when
        try {
            await client.authenticateAsync(userId, password);
        } catch (e) {
            error = e;
        }

        expect(error).to.be.not.null;
        expect(error.message).to.be.equal("Request failed with status code 401");
    });

    it("should call endpoint to fetch the running auctions and return result", async () => {
        //given
        const userId = "userId";
        const token = "token";
        const headers = {
            userId: userId,
            authtoken: token
        };
        const expected: IRunningAuctionListViewModel = {
            totalCount: 10,
            items: [{id: 1, numBids: 2, progress: 33}]
        };

        nock(config.baseUrl, {reqheaders: headers})
            .get(`/auction/salesman/${userId}/_all`)
            .reply(200, expected);

        //when
        const result = await client.getRunningAuctionsAsync(userId, token);

        //then
        expect(result).to.not.be.null;
        expect(result).to.deep.equal(expected);
    });

    it("should call endpoint to fetch the running auctions and throw error on bad response status code", async () => {
        //given
        const userId = "userId";
        const token = "token";
        let error = null;

        nock(config.baseUrl)
            .get(`/auction/salesman/${userId}/_all`)
            .reply(404, {});

        //when
        try {
            await client.getRunningAuctionsAsync(userId, token);
        } catch (e) {
            error = e;
        }

        //then
        expect(error).to.not.be.null;
        expect(error.message).to.be.equal("Request failed with status code 404");
    });
});