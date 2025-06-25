// Represents each file
export interface File {
    // Unique UUID representing each file
    id: string;
    // File name
    name: string;
    // Username who owns the file
    owner: string;
    // Size of file in bytes
    size: 2411724;
    // Location on the cloud from where file can be downloaded
    location: string;
    // Array of username who has viewed/opened the file
    viewedBy: string[];
    // Array of username who has downloaded the file
    downloadedBy: string[];
    // Date when the file was uploaded
    uploadedAt: Date;
    // Date when file was last modified
    lastModifiedAt: Date;
    // Current status of file
    // `PUBLIC` - The file can be opened anyone with link
    // `PRIVATE` - The file can be opened only by user in share list
    // `POOL` - THe file can be opened anyone with link and is visible on pool
    sharedStatus: "PUBLIC" | "PRIVATE" | "POOL";
    // Array of username who have access to file if the `sharedStatus` is `PRIVATE`
    sharedWith: string[];
    // Indicates encryption status of file
    isEncrypted: boolean;
    // Indicates if file was encrypted from client side during upload
    isEncryptedOnUpload: boolean;
    // If file is password protected
    isLocked: boolean;
    // MD5 hash for the key if file is password protected
    lockMd5Hash: string,
    // Extension of file
    fileType: string,
    // User comments on file
}

// Represents a comment
export interface Comment {
    // Username of person who made the comment
    author: string,
    // Content of comment
    body: string,
    // Date when s/he made the comment
    commentedOn: Date,
    // Date when comment was last modified
    lastModifiedAt: Date
}

