/**
 * Obtain the path to the Helm executable. Either from cache or by downloading it.
 *
 * @param version
 */
export declare const obtainHelmPath: (version?: string) => Promise<string>;
