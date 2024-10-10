/**
 * Obtain the path to the Helm executable. Either from cache or by downloading it.
 *
 * @param version
 */
export declare const obtainHelmPath: (version?: string) => Promise<string>;
export declare class Helm {
    private executablePath;
    private constructor();
    static create(version?: string): Promise<Helm>;
    exec(args: string[]): Promise<string>;
    addRepo(repoName: string, repoUrl: string): Promise<string>;
    updateRepo(repoName: string): Promise<string>;
}
