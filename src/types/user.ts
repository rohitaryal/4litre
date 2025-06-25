import type { Tracker } from "./tracking.js";

// Represents each user
export interface AuthorizedUser {
    // Unique identifier of each user
    username: string,
    // Email address to identify the user
    email: string,
    // Hashed password of user
    hashedPassword: string,
    // Link to user profile
    avatar: string,
    // UUID of file user has owned
    userFiles: string[],
    // UUID of foles that user has shared publicly and is visible with link
    publiclyShared: string[],
    // UUID of files that user has publicly shared on pool and is visible on pool
    publiclySharedInPool: string[],
    // UUID of files user has privately to some user
    sharedPrivately: string[],
    // User tracking
    tracking: Tracker,
}
