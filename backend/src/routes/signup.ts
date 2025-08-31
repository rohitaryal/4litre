import { Hono } from "hono";
import type { HonoContext } from "../types/hono.js";
import { addUser, getUserWithEmail, getUserWithUsername } from "../utils/sql/user.js";
import { loginValidator } from "../middlewares/validators.js";
import { hash } from "../utils/helpers.js";

const signUpRoute = new Hono<HonoContext>();

signUpRoute.post("/", loginValidator, async (c) => {
    const sql = c.get("sql");
    const reqBody = await c.req.parseBody();

    const username = reqBody['username'] as string;
    const fullName = reqBody['fullname'] as string;
    const email = reqBody['email'] as string;
    const password = reqBody['password'] as string;

    if (await getUserWithUsername(sql, username)) {
        return c.json({ error: "Username already taken" });
    }

    console.log(c.req.header("Origin"))

    if (await getUserWithEmail(sql, email)) {
        return c.json({ error: "Email address is already in use" })
    };

    const addedUser = await addUser(sql, fullName, username, email, hash(password));

    return c.redirect((c.req.header("Origin") + "/login") || "/");
});

signUpRoute.all((c) => c.text("Method Not Allowed", 405));

export default signUpRoute;
