import { createMiddleware } from "hono/factory";
import type { HonoContext } from "../types/hono.js";
import * as z from "zod";

// Validate sign up form body
export const signUpValidator = createMiddleware<HonoContext>(async (c, next) => {
    const schema = z.object({
        fullname: z.string().min(6).max(60).regex(/^[a-zA-Z]+$/, "Name can only contain characters a-z, A-Z"),
        username: z.string().min(4).max(20),
        email: z.email(),
        password: z.string(),
    });

    try {
        const parsedForm = await c.req.parseBody();
        const parsed = schema.safeParse(parsedForm);

        if (!parsed.success) {
            return c.json({ error: z.treeifyError(parsed.error) });
        }

        await next();
    } catch (err) {
        return c.json({ error: "Failed to parse form body" });
    }
});


// Validate login form body
export const loginValidator = createMiddleware<HonoContext>(async (c, next) => {
    const schema = z.object({
        username: z.string().min(4).max(20),
        password: z.string()
    });

    try {
        const parsedForm = await c.req.parseBody();
        const parsed = schema.safeParse(parsedForm);

        if (!parsed.success) {
            return c.json({ error: z.treeifyError(parsed.error) });
        }

        await next();
    } catch (err) {
        return c.json({ error: "Failed to parse form body" });
    }
});
