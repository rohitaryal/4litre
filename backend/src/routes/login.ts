import { Hono } from "hono";
import type { HonoContext } from "../types/hono.js";
import { loginValidator } from "../middlewares/validators.js";
import { generateUUID, hash } from "../utils/helpers.js";
import { getUserWithUsernameAndPassword } from "../utils/sql/user.js";
import { generateCookie } from "hono/cookie";
import { addUserCookie } from "../utils/sql/cookie.js";

const loginRoute = new Hono<HonoContext>();

loginRoute.post("/", loginValidator, async (c) => {
    const sql = c.get("sql");
    const parsedBody = await c.req.parseBody();

    const username = parsedBody['username'] as string;
    const hashedPassword = hash(parsedBody['password'] as string);

    const user = await getUserWithUsernameAndPassword(sql, username, hashedPassword);
    console.log(user);
    if (!user || !user.uuid) {
        return c.json({ error: "Invalid username or password" }, 401);
    }

    const cookieToken = generateUUID(72);
    await addUserCookie(sql, user.uuid, cookieToken, Date.now() + 86400 * 15);

    c.header("Set-Cookie", generateCookie("user", cookieToken, {
        maxAge: 86400 * 15,
        secure: false,
    }));

    return c.redirect(c.req.header("Origin") || "/");
});

loginRoute.all(c => c.text("Method Not Allowed", 405));

export default loginRoute;
