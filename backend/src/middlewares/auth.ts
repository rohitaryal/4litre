import { createMiddleware } from "hono/factory";
import { getUserFromCookie } from "../utils/sql/cookie.js";
import type { HonoContext } from "../types/hono.js";

export const chechUserAuth = createMiddleware<HonoContext>(async (c, next) => {
    const sql = c.get("sql");
    const cookie = c.req.header("Cookie")?.substring("user=".length) || "";

    if (!cookie) return c.json({ loggedIn: false });

    const userDetails = await getUserFromCookie(sql, cookie);
    if (!userDetails) { return c.json({ loggedIn: false }) };

    c.set("user", userDetails);

    await next();
});
