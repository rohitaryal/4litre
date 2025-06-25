export interface Tracker {
    // Files user has opened/viewed till now
    viewedFiles: string[],
    // Files user has downloaded till now
    downloadedFiles: string[],
    // Files user has made comment on
    userCommentedOn: string[],
}
