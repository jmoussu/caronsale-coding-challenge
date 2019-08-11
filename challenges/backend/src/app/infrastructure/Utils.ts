import crypto = require("crypto");

export function hash2(plainText: string, cycles: number) {
    if (cycles < 1) {
        throw new Error("Invalid hashing cycles");
    }

    let hash: string = plainText;

    for (let i: number = 0; i < cycles; i++) {
        hash = crypto.createHash("sha512").update(hash).digest("hex");
    }

    return hash;
}