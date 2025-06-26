import { Hono } from "hono";
import type { Env } from "../types/env.js";
import { loginValidator } from "../middleware/validators.js";
import { setCookie } from "../utils/cookie.js";
import { randomUUID } from "node:crypto";
import { redirectIfLoggedIn } from "../middleware/auth.js";
import { hash } from "../utils/hash.js";
import { readFile } from "../utils/file.js";

const login = new Hono<Env>();
login.use(redirectIfLoggedIn);

// TODO: This is wrong in the first place,
//      We need to make a form instead of json submission
//      so that browser can follow the request instead of us
//      manually doing `location.reload()` after logging in
login.post("/", loginValidator, async (c) => {
    const json = await c.req.json();
    const sql = c.get("sqlContext");

    json.password = hash(json.password);

    try {
        // Check if user exists
        const result = await sql`SELECT * FROM users WHERE email=${json.email} AND hashed_password=${json.password} AND username=${json.username}`;

        if (result.length > 0) {
            // Random uuid to be used as session. Learnt from `Hevy` :)
            const uuid = randomUUID();

            // Add session to db
            await sql`INSERT INTO sessions VALUES(${uuid}, ${json.username})`;

            // Set session to cookie
            c.res.headers.set("Set-Cookie", setCookie("session", uuid, {
                httpOnly: true,
                expires: new Date(Date.now() + 86400 * 1000 * 10), // 10 days from now
            }));
            return c.redirect("/");
        }

        return c.json({ error: "Invalid username or password" }, 401);
    } catch (err) {
        return c.json({ error: "Something went wrong!" }, 403);
    }
});

login.get("/", (c) => {
    return c.html(readFile("./src/static/login.html"))
})

export default login;
