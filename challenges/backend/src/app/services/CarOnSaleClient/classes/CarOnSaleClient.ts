import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { injectable } from "inversify";
import { sha512 } from "js-sha512";
import axios, { AxiosResponse } from "axios";
import "reflect-metadata";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    public constructor() { }

    public async getRunningAuctions(): Promise<AxiosResponse> {

        let hash = "123test";
        for (let i = 0; i < 5; i++) {
            hash = sha512(hash);
        }
        const axiosResAuth = await axios({
            method: 'put',
            url: 'https://caronsale-backend-service-dev.herokuapp.com/api/v1/authentication/salesman@random.com',
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            data: {
                password: hash,
            },
        });
        const token = axiosResAuth.data.token;
        const axiosResAuctions = axios({
            method: 'get',
            url: 'https://caronsale-backend-service-dev.herokuapp.com/api/v1/auction/salesman/salesman@random.com/_all',
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "userid": "salesman@random.com",
                "authtoken": token,
            },
        });
        return axiosResAuctions;
    }
}
