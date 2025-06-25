export interface CookieOptions {
    // Controls how cookie is handled with cross site requests.
    sameSite?: "Strict" | "Lax" | "None"
    // Expiry date of a cookie
    expires?: Date;
    // Prevents client side from accessing the cookie
    httpOnly?: boolean;
    // Indicates the cookie should be sent only on `https`
    secure?: boolean;
    // Maximum age for a cookie to be valid.
    // max-age has more priority than expires, if both are present
    maxAge?: number;
}
