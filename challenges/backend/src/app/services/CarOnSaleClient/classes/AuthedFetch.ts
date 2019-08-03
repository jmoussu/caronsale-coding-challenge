import {inject, injectable} from "inversify";
import "reflect-metadata";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import {createHash} from "crypto";
import * as fetch from "node-fetch";

export type fetchfn = (url: fetch.RequestInfo, init?: fetch.RequestInit) => Promise<fetch.Response>;

@injectable()
export class AuthedFetchFactory {

    private hashPasswordWithCycles(plainTextPassword: string, cycles: number): string {
        let hash = `${plainTextPassword}`;

        for(let i = 0; i < cycles; i++) {
            const sha512 = createHash("sha512");
            sha512.update(hash);
            hash = sha512.digest("hex");
        }

        return hash;
    }

    public constructor(
        @inject(DependencyIdentifier.FETCH) private externalFetch: fetchfn,
    ) { }

    public async authenticate(base: string, userMailId: string, password: string): Promise<fetchfn> {
        const hashedPassword = this.hashPasswordWithCycles(password, 5);
        const encUserMailId = encodeURIComponent(userMailId);
        const headers = {
            "Accept": "application/json",
            "User-Agent": "caronsale-coding-challenge",
        };

        const authResponse = await this.externalFetch(base + "authentication/" + encUserMailId, {
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

        return async (url: fetch.RequestInfo, init?: fetch.RequestInit): Promise<fetch.Response> => {
            init.headers = {
                ...init.headers,
                userid: userMailId,
                authtoken: auth.token,
            };

            return this.externalFetch(base + url, init);
        };
    }

}
