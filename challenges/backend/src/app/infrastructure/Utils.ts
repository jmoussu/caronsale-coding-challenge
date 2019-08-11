import crypto = require("crypto");
import {ErrorMessages} from "./ErrorMessages";

export function hash(plainText: string, cycles: number) {
    if (cycles < 1) {
        throw new Error(ErrorMessages.INVALID_HASH_CYCLE_COUNT);
    }

    let result: string = plainText;

    for (let i: number = 0; i < cycles; i++) {
        result = crypto.createHash("sha512").update(result).digest("hex");
    }

    return result;
}