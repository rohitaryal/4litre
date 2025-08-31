import type { Sql } from "postgres";

export type HonoContext = {
    Variables: Variables
}

// These are key-value pair variables with a lifetime of current
// request. They should be available with c.get(), c.set()
export type Variables = {
    sql: Sql;
    user: any;
}
