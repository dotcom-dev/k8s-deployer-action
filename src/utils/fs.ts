import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import * as core from '@actions/core';
import { ToolRunner } from '@actions/exec/lib/toolrunner';

import type { ExecOptions, ExecOutput } from '@actions/exec';

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

/**
 * Execute a command and return the output
 * @param executablePath
 * @param args
 * @param options
 */
export const execCommand = async (
  executablePath: string,
  args: string[],
  options: ExecOptions = {} as ExecOptions
): Promise<string> => {
  const execOutput: Pick<ExecOutput, 'stdout' | 'stderr'> = {
    stdout: '',
    stderr: '',
  };

  options.listeners = {
    stdout: (data: Buffer) => {
      execOutput.stdout += data.toString();
    },
    stderr: (data: Buffer) => {
      execOutput.stderr += data.toString();
    },
  };

  const toolRunner = new ToolRunner(executablePath, args, options);

  const result = await toolRunner.exec();

  if (result != 0) {
    if (execOutput.stderr) {
      throw Error(execOutput.stderr);
    } else {
      throw Error(
        util.format('%s exited with result code %s', executablePath, result)
      );
    }
  }

  return execOutput.stdout;
};
