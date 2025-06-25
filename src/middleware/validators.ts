import * as z from "zod";
import type { Env } from "../types/env.js";
import { createMiddleware } from "hono/factory";

// Checks if the request is authorized by looking the `Cookie` header
const registrationValidator = createMiddleware<Env>(async (c, next) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        username: z.string().max(32),
    });

    try {
        const json = await c.req.json();
        const parsed = schema.safeParse(json);

        if (!parsed.success) {
            return c.json({ error: parsed.error.format() }, 400);
        }

        await next();
    } catch (err) {
        return c.json({ error: "Malformed JSON" }, 400)
    }
})

// Checks if the user trying to visit endpoint like `/login`, `/registration`
// but the user has already a valid session token
const loginValidator = createMiddleware<Env>(async (c, next) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        username: z.string().max(32),
    });

    try {
        const json = await c.req.json();
        const parsed = schema.safeParse(json);

        if (!parsed.success) {
            return c.json({ error: parsed.error.format() }, 400);
        }

        await next();
    } catch (err) {
        return c.json({ error: "Malformed JSON" }, 400);
    }
});

// Validates PATCH request on '/user' that modifies user details
const userPatchValidator = createMiddleware<Env>(async (c, next) => {
    const schema = z.object(({
        email: z.string().email().optional(),
        password: z.string().min(8).optional(),
        avatar: z.string().min(10).max(1024),
    }));

    try {
        const json = await c.req.json();
        const parsed = schema.safeParse(json);

        if (!parsed.success) {
            return c.json({ error: parsed.error.format() }, 400);
        }

        await next()
    } catch (err) {
        return c.json({ error: "Malformed JSON" }, 400);
    }
})

export { registrationValidator, loginValidator, userPatchValidator };
