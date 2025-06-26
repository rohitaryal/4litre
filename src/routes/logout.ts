import { Hono } from "hono";
import type { Env } from "../types/env.js";
import { setCookie } from "../utils/cookie.js";

const logout = new Hono<Env>();

logout.all((c) => {
    c.res.headers.set("Set-Cookie", setCookie("session", "nothing-here", {
        expires: new Date(),
        maxAge: 0,
        secure: true,
    }))

    return c.redirect("/login")
});

export default logout;
