import { Hono } from "hono";
import type { HonoContext } from "../types/hono.js";
import { generateCookie } from "hono/cookie";

const logoutRoute = new Hono<HonoContext>();

logoutRoute.get("/", (c) => {
    c.header("Set-Cookie", generateCookie("user", "stupidthing", { maxAge: 0 }))

    return c.text("OK");

    //    return c.redirect(c.req.header("Origin") + "/login");
});

logoutRoute.all((c) => c.json({ error: "Method Not Allowed" }, 403));

export default logoutRoute;
