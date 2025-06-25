import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { checkAuth } from "./middleware/auth.js";

const app = new Hono();
app.use(logger());

app.get("/register", async (c) => {
    c.text("FUCK YOU", 404);
});

app.get("/login", async (c) => {
    c.text("FUCK YOU LOGIN", 404)
});

// TODO: List then endpoints that require authentication
//       below this middleware usage and if not, place above me.
app.use(checkAuth);

serve({
    port: 8848,
    fetch: app.fetch
}, (info) => console.log(`[+] Server started at port: ${info.port}`));
