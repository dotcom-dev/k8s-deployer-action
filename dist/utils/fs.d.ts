/**
 * Return an array containing all recursive files and directories under a given directory for a given file name
 *
 * @param directoryPath
 * @param fileToFind
 * @param foundFiles
 */
export declare const walkSync: (directoryPath: string, fileToFind: string, foundFiles?: string[]) => string[];
