import { randomUUID } from "crypto";
import type { CookieParams } from "../types/params.js";

export const generateUUID = function (length = 36) {
    let generatedUUID = "";

    while (length) {
        generatedUUID += randomUUID();
        length -= 36;
    }

    return generatedUUID;
}

// TODO: Add a proper hash man
export const hash = function (str: string) {
    return `####${str}####`
}
