export enum SystemType {
  Windows = 'Windows_NT',
  Linux = 'Linux',
  Darwin = 'Darwin',
}

export enum SystemArch {
  X64 = 'x64',
  Arm = 'arm',
  Arm64 = 'arm64',
}

/**
 * Utility to help with mapping system types and archs to values.
 */
export class SystemMap<TValue = string> {
  private readonly map = new Map<SystemType, Map<SystemArch, TValue>>();

  constructor(
    definitions: Partial<
      Record<SystemType, Partial<Record<SystemArch, TValue>>>
    >
  ) {
    for (const [type, archDefinitions] of Object.entries(definitions)) {
      const archMap = new Map<SystemArch, TValue>();

      if (archDefinitions) {
        for (const [archKey, archValue] of Object.entries(archDefinitions)) {
          if (archValue) {
            archMap.set(archKey as SystemArch, archValue);
          }
        }
      }

      this.map.set(type as SystemType, archMap);

      console.log('2', this.map.get(SystemType.Linux)?.get(SystemArch.X64));
    }
  }

  public get<TReturnValue = TValue>(
    type: SystemType,
    arch: SystemArch,
    formatter?: (value?: TValue) => TReturnValue
  ): TReturnValue | undefined {
    const value = this.map.get(type)?.get(arch);

    if (value && formatter) {
      return formatter(value);
    }

    return value as TReturnValue | undefined;
  }
}
