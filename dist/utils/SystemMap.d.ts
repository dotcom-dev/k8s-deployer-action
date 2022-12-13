export declare enum SystemType {
    Windows = "Windows_NT",
    Linux = "Linux",
    Darwin = "Darwin"
}
export declare enum SystemArch {
    X64 = "x64",
    Arm = "arm",
    Arm64 = "arm64"
}
/**
 * Utility to help with mapping system types and archs to values.
 */
export declare class SystemMap<TValue = string> {
    private readonly map;
    constructor(definitions: Partial<Record<SystemType, Partial<Record<SystemArch, TValue>>>>);
    get<TReturnValue = TValue>(type: SystemType, arch: SystemArch, formatter?: (value?: TValue) => TReturnValue): TReturnValue | undefined;
}
