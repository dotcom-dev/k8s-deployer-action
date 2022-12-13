import type { ExecOptions } from '@actions/exec';
/**
 * Return an array containing all recursive files and directories under a given directory for a given file name
 *
 * @param directoryPath
 * @param fileToFind
 * @param foundFiles
 */
export declare const walkSync: (directoryPath: string, fileToFind: string, foundFiles?: string[]) => string[];
/**
 * Execute a command and return the output
 * @param executablePath
 * @param args
 * @param options
 */
export declare const execCommand: (executablePath: string, args: string[], options?: ExecOptions) => Promise<string>;
