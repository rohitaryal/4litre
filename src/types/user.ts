import type { Tracker } from "./tracking.js";

// Represents what routes and middlewares know about a clients request
export interface UserContext {
    // Unique identifier of each user
    username: string;
    // Email address to identify the user
    email: string;
    // Hashed password of user
    hashedPassword: string;
    // Link to user profile
    avatar: string;
    // UUID of file user has owned
}

// Represents each user
export interface AuthorizedUser extends UserContext {
    userFiles: string[];
    // UUID of foles that user has shared publicly and is visible with link
    publiclyShared: string[];
    // UUID of files that user has publicly shared on pool and is visible on pool
    publiclySharedInPool: string[];
    // UUID of files user has privately to some user
    sharedPrivately: string[];
    // User tracking
    tracking: Tracker;
}
