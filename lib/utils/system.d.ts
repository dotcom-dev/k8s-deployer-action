import type { SystemArch, SystemType } from './SystemMap';
/**
 * Get info about the current system.
 */
export declare const getSystemInfo: () => {
    type: SystemType;
    arch: SystemArch;
};
/**
 * Get executable file extension for the current system.
 */
export declare const getSystemExecutableExtension: () => string;
