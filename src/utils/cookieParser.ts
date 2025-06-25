import type { CookieOptions } from "../types/cookie.js";

const getCookie = (name: string, cookie: string): string | Error => {
    if (!name || !cookie)
        return Error("getCookie(): Some arguments are missing");

    name = name + "="
    const splittedCookie = cookie.split("; ");

    for (const cookie_item of splittedCookie) {
        if (cookie_item.startsWith(cookie_item)) {
            return cookie_item.slice(name.length)
        }
    }

    return ""
}

const setCookie = (name: string, value: string, options?: CookieOptions): string | Error => {
    if (!name || !value)
        return Error("setCookie(): Some arguments are missing");

    let cookie = `${name}=${value};`;

    if (options?.httpOnly)
        cookie = `${cookie} HttpOnly;`

    if (options?.secure)
        cookie = `${cookie} Secure;`

    if (options?.sameSite)
        cookie = `${cookie} SameSite=${options.sameSite};`
    else
        cookie = `${cookie} SameSite=Lax;`

    if (options?.maxAge)
        cookie = `${cookie} Max-Age: ${options.maxAge};`

    if (options?.expires)
        cookie = `${cookie} Expires: ${options.expires};`

    return cookie;
}

export { getCookie, setCookie };
