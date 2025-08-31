import type { Sql } from "postgres";
import { generateUUID } from "../helpers.js";

export const getUserWithEmail = async function (sql: Sql, email: string) {
    const user = await sql`SELECT username, full_name, email_address FROM users WHERE email_address=${email} LIMIT 1;`;

    return user[0];
}

export const getUserWithUsername = async function (sql: Sql, username: string) {
    const user = await sql`SELECT username, full_name, email_address FROM users WHERE username=${username} LIMIT 1;`;

    return user[0];
}

export const addUser = async function (sql: Sql, fullName: string, username: string, email: string, password: string) {
    const addedUser = await sql`
        INSERT INTO USERS(uuid, username, full_name, email_address, hashed_password) VALUES(
            ${generateUUID(72)}, ${username},
            ${fullName}, ${email}, ${password}
        ) RETURNING *;`

    return addedUser[0];
}

export const getUserWithUsernameAndPassword = async function (sql: Sql, username: string, password: string) {
    const user = await sql`SELECT uuid, username, full_name, email_address FROM users WHERE username=${username} AND hashed_password=${password} LIMIT 1;`;

    return user[0];
}
