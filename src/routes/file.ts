import { Hono } from "hono";
import type { Env } from "../types/env.js";

const file = new Hono<Env>();

// Returns all the user files or only file of given status if status is provided
file.get("/:filestatus?", async (c) => {
    const user = c.get("userContext");
    const sql = c.get("sqlContext");

    const status = c.req.param("filestatus");

    try {
        const dbResult = await sql`SELECT * FROM files WHERE owner=${user.username}${status ? ` AND status=${status}` : ""}`
        return c.json(dbResult)
    } catch (err) {
        return c.json({ error: "Something went wrong" }, 500);
    }
});

file.post("/upload", async (c) => {
    const user = c.get("userContext");
    const sql = c.get("sqlContext");

    const body = await c.req.parseBody();

    // A file has following properties
    // though it shows the property doesn't exist error.
    const file = body['file'];
    if (typeof file == "string") {
        return c.json(401);
    }

    const fileSize = file.size;
    const fileType = file.type;
    const fileName = file.name;
    const lastModified = file.lastModified;

    return c.text("OK NICE");
})

// Don't get confused, this is delete method
file.delete("/:fileid", async (c) => {
    // TODO: Add the delete thing, and make sure to check if owner owns that file first
});

file.get("/info/:fileid", async (c) => {
    const user = c.get("userContext");
    const sql = c.get("sqlContext");

    const id = c.req.param("fileid");

    try {
        // Only provide detail if 
        // 1. The user owns it
        // 2. The file is publicly available
        // 3. File is shared in pool
        const dbResult = await sql`SELECT * from files WHERE file_id=${id} AND (owner=${user.username} OR shared_status IN('PUBLIC', 'POOL'))`
        if (dbResult.length == 0) {
            return c.json({ error: "Invalid file id or permission denied" });
        }

        return c.json(dbResult);
    } catch (err) {
        return c.json({ error: "Failed to fetch details from database." });
    }
});

export default file;
