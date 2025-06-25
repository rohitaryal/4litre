import { Hono } from "hono";
import type { Env } from "../types/env.js";
import { userPatchValidator } from "../middleware/validators.js";
import { hash } from "../utils/hash.js";

const user = new Hono<Env>();

// Get info about the user
user.get("/", (c) => {
    return c.json(c.get("userContext"));
});

// Updates user properties in database
user.patch("/", userPatchValidator, async (c) => {
    const sql = c.get("sqlContext");
    const user = c.get("userContext");

    const json = await c.req.json();

    if (json.email) {
        try {
            await sql`UPDATE users SET email=${json.email} WHERE username=${user.username}`;
        } catch (err) {
            return c.json({ error: "Failed to update user email" }, 500)
        }
    }

    if (json.password) {
        try {
            json.password = hash(json.password)
            await sql`UPDATE users SET hashed_password=${json.password} WHERE username=${user.username}`;
        } catch (err) {
            return c.json({ error: "Failed to update user password" }, 500)
        }
    }

    if (json.avatar) {
        try {
            await sql`UPDATE users SET avatar=${json.avatar} WHERE username=${user.username}`;
        } catch (err) {
            return c.json({ error: "Failed to update user avatar" }, 500);
        }
    }

    return c.status(200);
});

// Returns information about a user
user.get("/:username", async (c) => {
    const sql = c.get("sqlContext");
    const username = c.req.param("username");

    try {
        const dbResult = await sql`SELECT * FROM users WHERE username=${username}`;
        if (dbResult.length == 0)
            return c.json({ error: "User not found" }, 404)

        let user = dbResult[0];

        // Remove the hashed password from response
        delete user.hashed_password;
        c.res.headers.set("Content-Type", "application/json");

        return c.json(user);
    } catch (err) {
        return c.json({ error: "Something went wrong!" }, 500);
    }
});


export default user;
