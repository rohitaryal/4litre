import type { Sql } from "postgres";

export const createMissingTables = async function (sql: Sql) {
    try {
        // Hide "relaton already exists" notice
        await sql`SET client_min_messages = WARNING;`

        await sql`CREATE TABLE IF NOT EXISTS users (
            uuid VARCHAR(72) PRIMARY KEY,
            username VARCHAR(20) NOT NULL UNIQUE,
            full_name VARCHAR(300) NOT NULL,
            email_address VARCHAR(254) NOT NULL UNIQUE,
            hashed_password VARCHAR(60) NOT NULL
        );`

        await sql`CREATE TABLE IF NOT EXISTS cookies (
            cookie VARCHAR(72) NOT NULL PRIMARY KEY,
            expires_at BIGINT NOT NULL,
            uuid VARCHAR(72) REFERENCES users(uuid)
        );`
    } catch (err) {
        console.log("[!] Error occured while creating tables")
    }
}
