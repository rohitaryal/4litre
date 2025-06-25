import { appendFileSync } from "node:fs";

const LOG_FILE = "weblog.txt";

const logwriter = function (str1: string, str2: any): string {
    if (!str1 && !str2)
        return "";

    console.log(str1);

    if (str2) {
        try {

            if (str2 instanceof Error)
                console.log("[!] Error log written to " + LOG_FILE)

            appendFileSync(LOG_FILE, `-----${new Date()}-----\n${str1}\n${str2 || ""}\n----------\n`);
        } catch (err) {
            console.log("[!] Failed to write log to " + LOG_FILE)
            console.log(err);
        }
    }

    // Return same log message for hassle free re-use.
    return str1;
}

export { logwriter };
