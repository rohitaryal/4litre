import type { Sql } from "postgres";
import type { AuthorizedUser } from "./user.js";

// Represents environment variable
export interface EnvironmentVariables {
    // Host of postgresql server
    DB_HOST: string;
    // Port number to postgresql server
    DB_PORT: number;
    // Username for postgresql
    DB_USERNAME: string;
    // Password for postgresql
    DB_PASSWORD: string;
    // Database to connect to
    DB_DATABASE: string;
}

// For Hono
export type Env = {
    Variables: {
        userContext: AuthorizedUser,
        sqlContext: Sql
    },
    Bindings: EnvironmentVariables,
}
