import crypto = require("crypto");
import {ErrorMessages} from "./ErrorMessages";

export function hash2(plainText: string, cycles: number) {
    if (cycles < 1) {
        throw new Error(ErrorMessages.INVALID_HASH_CYCLE_COUNT);
    }

    let hash: string = plainText;

    for (let i: number = 0; i < cycles; i++) {
        hash = crypto.createHash("sha512").update(hash).digest("hex");
    }

    return hash;
}