import { Hono } from "hono";
import type { Env } from "../types/env.js";
import { registrationValidator } from "../middleware/validators.js";
import { hash } from "../utils/hash.js";
import { redirectIfLoggedIn } from "../middleware/auth.js";
import { readFile } from "../utils/file.js";

const register = new Hono<Env>();
register.use(redirectIfLoggedIn);

register.post("/", registrationValidator, async (c) => {
    const json = await c.req.json();
    json.password = hash(json.password);
    const sql = c.get("sqlContext");

    try {
        const existingUsers = await sql`SELECT * FROM users WHERE username=${json.username} OR email=${json.email}`;
        if (existingUsers.length > 0)
            return c.json({ error: "Username or email is already used" });

        await sql`INSERT INTO users VALUES(${json.username}, ${json.email}, ${json.password})`;

        return c.redirect("/login");
    } catch (err) {
        return c.json({ error: "Something went wrong!" }, 400);
    }
});

register.get("/", (c) => c.html(readFile("./src/static/register.html")));

export default register;
