import { Hono } from "hono";
import { cors } from "hono/cors";
import { chechUserAuth } from "./middlewares/auth.js";
import postgres from "postgres";
import type { HonoContext } from "./types/hono.js";
import "dotenv/config"; // No need to call `config()` for ES6
import { createMissingTables } from "./utils/sql/initSql.js";
import signUpRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import { logger } from "hono/logger";
import logoutRoute from "./routes/logout.js";



const sql = postgres({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432, // Fuck you man
    database: process.env.DB_NAME || "postgres",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "",
});
createMissingTables(sql);



const app = new Hono<HonoContext>();
app.use(logger());
app.use(cors(
    {
        // Because clients have used {credentials: true} to send
        // Cross-Origin request with cookies attached.
        //
        // And the policy is the server shouldnot respond with
        // Access-Control-Allow-Origin: *, when {credentials: true}
        //
        // To fix this, provide the origin that request occured from
        origin: (origin) => origin,
        credentials: true,
    }
));


// Attach all the contexts here
app.use("*", async (c, next) => {
    c.set("sql", sql);
    await next()
});
app.route("/signup", signUpRoute);
app.route("/login", loginRoute);


// Check if user is authenticated
app.use("*", chechUserAuth);

app.route("/logout", logoutRoute);


app.get("/", (c) => c.json({ loggedIn: true }));


export default app;

// TODO: Add CORS + CSRF protection
