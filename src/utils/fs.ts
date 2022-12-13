import * as fs from 'fs';
import * as path from 'path';

import * as core from '@actions/core';

/**
 * Return an array containing all recursive files and directories under a given directory for a given file name
 *
 * @param directoryPath
 * @param fileToFind
 * @param foundFiles
 */
export const walkSync = (
  directoryPath: string,
  fileToFind: string,
  foundFiles: string[] = []
): string[] => {
  const files = fs.readdirSync(directoryPath);

  files.forEach(function (file) {
    if (fs.statSync(path.join(directoryPath, file)).isDirectory()) {
      foundFiles = walkSync(
        path.join(directoryPath, file),
        fileToFind,
        foundFiles
      );
    } else {
      core.debug(file);

      if (file == fileToFind) {
        foundFiles.push(path.join(directoryPath, file));
      }
    }
  });

  return foundFiles;
};
