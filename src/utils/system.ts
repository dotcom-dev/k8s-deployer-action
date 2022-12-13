import * as os from 'os';

import type { SystemArch, SystemType } from './SystemMap';

/**
 * Get info about the current system.
 */
export const getSystemInfo = () => {
  const { type, arch } = os;

  return {
    type: type() as SystemType,
    arch: arch() as SystemArch,
  };
};

/**
 * Get executable file extension for the current system.
 */
export const getSystemExecutableExtension = (): string => {
  if (os.type().match(/^Win/)) {
    return '.exe';
  }

  return '';
};
