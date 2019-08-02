import {inject, injectable} from "inversify";
import "reflect-metadata";
import {createHash} from "crypto";
import {RequestInfo, RequestInit, Response} from "node-fetch";
import fetch from "node-fetch";

export type fetchfn = (url: RequestInfo, init?: RequestInit) => Promise<Response>;

export class AuthedFetchFactory {

    private static hashPasswordWithCycles(plainTextPassword: string, cycles: number): string {
        let hash = `${plainTextPassword}`;

        for(let i = 0; i < cycles; i++) {
            const sha512 = createHash("sha512");
            sha512.update(hash);
            hash = sha512.digest("hex");
        }

        return hash;
    }

    public static async authenticate(userMailId: string, password: string): Promise<fetchfn> {
        const hashedPassword = this.hashPasswordWithCycles(password, 5);
        const encUserMailId = encodeURIComponent(userMailId);
        const headers = {
            "Accept": "application/json",
            "User-Agent": "caronsale-coding-challenge",
        };

        const base = "https://caronsale-backend-service-dev.herokuapp.com/api/v1/";

        const authResponse = await fetch(base + "authentication/" + encUserMailId, {
            method: "PUT",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: hashedPassword,
                meta: "",
            }),
        });

        const auth = await authResponse.json();

        return async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
            init.headers = {
                ...init.headers,
                userid: userMailId,
                authtoken: auth.token,
            };

            return fetch(base + url, init);
        };
    }

}
