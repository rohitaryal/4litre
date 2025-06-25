import { createMiddleware } from "hono/factory";
import { getCookie } from "../utils/cookie.js";
import type { Env } from "../types/env.js";
import type { UserContext } from "../types/user.js";

// Check for authentication
const checkAuth = createMiddleware<Env>(async (c, next) => {
    const cookieHeader = c.req.header("Cookie");
    if (!cookieHeader)
        return c.redirect("/login");

    const session = getCookie("session", cookieHeader);
    if (!session || typeof session != "string")
        return c.redirect("/login");

    const sql = c.get("sqlContext");
    try {
        const activeSessions = await sql`SELECT username FROM sessions WHERE session_token=${session}`;
        if (activeSessions.length == 0)
            return c.redirect("/login")

        const userResult = await sql`SELECT * FROM users WHERE username=${activeSessions[0].username}`

        c.set("userContext", userResult[0] as UserContext);

        return await next();
    } catch (err) {
        return c.json({ error: "Something went wrong!" })
    }
});


// If we have working cookie, just redirect from endpoints like `/login`, `/signup`
const redirectIfLoggedIn = createMiddleware<Env>(async (c, next) => {
    const cookieHeader = c.req.header("Cookie");
    if (!cookieHeader)
        return await next();

    const session = getCookie("session", cookieHeader);
    if (!session || typeof session != "string")
        return await next();

    const sql = c.get("sqlContext");
    // Check if we have the session
    const activeSessions = await sql`SELECT username FROM sessions WHERE session_token=${session}`;

    if (activeSessions.length > 0)
        return c.redirect("/");

    return await next();
});

const checkIfBannedClient = createMiddleware<Env>(async (_, next) => {
    // TODO: Add the ip check thing, for now i dunno how to get ip
    await next();
});

export { checkAuth, redirectIfLoggedIn, checkIfBannedClient };
