import type { Sql } from "postgres";

export const getUserFromCookie = async (sql: Sql, cookieString: string = "") => {
    const userDetails = await sql`
        SELECT username, full_name, email_address FROM users WHERE uuid=(
            SELECT uuid FROM cookies WHERE cookie=${cookieString}
        );`;

    return userDetails[0];
}

export const addUserCookie = async (sql: Sql, uuid: string, cookieString: string, expiresAt: number) => {
    const addedCookie = await sql`
        INSERT INTO cookies(cookie, expires_at, uuid) VALUES(
            ${cookieString}, ${expiresAt}, ${uuid}
        ) RETURNING *;`

    return addedCookie[0];
}
