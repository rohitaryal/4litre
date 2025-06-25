import { createMiddleware } from "hono/factory";
import { getCookie } from "../utils/cookieParser.js";

// Check for authentication
const checkAuth = createMiddleware(async (c, next) => {
    const cookieHeader = c.req.header("Cookie");
    if (!cookieHeader)
        return c.text("Not authenticated", 403);

    const session = getCookie("session", cookieHeader);
    if (!session)
        return c.text("Not authenticated", 403);

    // TODO: Check if the session is associated
    //       with any user and is not expired.
    //       And do `c.set("user")` to provide
    //       user details to all routes.

    await next();
});

export { checkAuth };
