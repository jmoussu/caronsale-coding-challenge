import {expect} from "chai";
import {hash} from "./Utils";
import {ErrorMessages} from "./ErrorMessages";

describe("hash", () => {
    // test vectors at https://www.di-mgt.com.au/sha_testvectors.html
    const theories = [
        ["abc", 1, "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f"],
        ["a".repeat(1000000), 1, "e718483d0ce769644e2e42c7bc15b4638e1f98b13b2044285632a803afa973ebde0ff244877ea60a4cb0432ce577c31beb009c5c2c49aa2e4eadb217ad8cc09b"]
    ];

    const invalidInputTheories = [
        ["", 1, ErrorMessages.INVALID_PASSWORD_INPUT],
        [null, 5, ErrorMessages.INVALID_PASSWORD_INPUT],
        ["password", 0, ErrorMessages.INVALID_HASH_CYCLE_COUNT],
        ["password", null, ErrorMessages.INVALID_HASH_CYCLE_COUNT],
    ];

    theories.forEach(([input, cycles, expected], index) => {
        it(`should return correct hash ${index}`, () => {
            // act
            const result = hash(input.toString(), cycles as number);

            //assert
            expect(result).to.be.equal(expected);
        });
    });

    invalidInputTheories.forEach(([password, cyclesCount, expectedErrorMessage], index) => {
        it(`should throw error on bad input ${index}`, () => {
            // arrange
            let error = null;

            // act
            try {
                hash(password as string, cyclesCount as number);
            } catch (e) {
                error = e;
            }

            // assert
            expect(error).to.be.not.null;
            expect((error as Error).message).to.equal(expectedErrorMessage);
        });
    })
});