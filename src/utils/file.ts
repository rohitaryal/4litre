import { readFileSync } from "node:fs"

// Because `serveStatic()` was not working or i dunno how to use
const readFile = function (path: string): string {
    try {
        return readFileSync(path, "utf-8");
    } catch (err) {
        return ""
    }
}

export { readFile }
