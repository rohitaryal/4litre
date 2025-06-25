import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { checkAuth, checkIfBannedClient } from "./middleware/auth.js";
import postgres, { type Sql } from "postgres";
import type { Env } from "./types/env.js";
import register from "./routes/register.js";
import login from "./routes/login.js";
import user from "./routes/user.js";
import file from "./routes/file.js";

// No need to call `config()` for es6
import "dotenv/config";
import { readFile } from "./utils/file.js";
import logout from "./routes/logout.js";


const app = new Hono<Env>();

app.use(logger());
app.use(checkIfBannedClient);

const sql: Sql = postgres({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
// Make SQL context available everywhere
app.use("*", async (c, next) => {
    c.set("sqlContext", sql)
    await next();
});

app.route("/login", login);
app.route("/logout", logout);
app.route("/register", register);

// TODO: List the endpoints that require authentication
//       below this middleware usage and if not, place above me.
app.use(checkAuth);

app.route("/api/user", user);
app.route("/api/file", file);

app.all("/", c => c.html(readFile("./src/static/index.html")))

serve({
    port: 8848,
    fetch: app.fetch
}, (info) => console.log(`[+] Server started at port: ${info.port}`));
