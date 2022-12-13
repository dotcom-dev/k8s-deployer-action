import * as core from '@actions/core';
import { getInput } from '@actions/core';

import { Helm } from './utils/helm';

type NameValuePair = {
  name: string;
  value: string;
};

const getValues = () => {
  const valuesInput = core.getInput('values', {
    required: false,
  });

  if (!valuesInput) {
    return [];
  }

  const rawValues = valuesInput.split('\n');

  if (rawValues.length < 1) {
    return [];
  }

  return rawValues.reduce((valuePairs, rawValue) => {
    const rawValueComponents = rawValue.split(':');

    valuePairs.push({
      name: rawValueComponents[0],
      value: rawValueComponents.slice(1).join(':'),
    });

    return valuePairs;
  }, [] as NameValuePair[]);
};

const getValueFiles = () => {
  const valueFilesInput = core.getInput('valueFiles', {
    required: false,
  });

  if (!valueFilesInput) {
    return [];
  }

  const valueFiles = valueFilesInput.split('\n');

  if (valueFiles.length < 1) {
    return [];
  }

  return valueFiles;
};

const main = async (): Promise<void> => {
  // TODO: determine kubeconfig path

  // TODO: determine Helm

  // TODO: add default repo

  // TODO: add repo

  const helm = await Helm.create();

  const namespace = getInput('namespace', { required: true });
  const releaseName = getInput('releaseName', { required: true });
  const defaultRepo = {
    name: 'gamote',
    url: 'https://gamote.github.io/charts',
    chart: 'deployer',
  };

  await helm.addRepo(defaultRepo.name, defaultRepo.url);

  const helmArgs = [
    // 'template',
    'install',
    `-n ${namespace}`,
    releaseName,
    `${defaultRepo.name}/${defaultRepo.chart}`,
  ];

  getValueFiles().forEach((file) => {
    helmArgs.push('-f');
    helmArgs.push(file);
  });

  getValues().forEach(({ name, value }) => {
    helmArgs.push('--set');
    helmArgs.push(`${name}=${value}`);
  });

  console.log('helmArgs', helmArgs);

  const templateOutput = await helm.exec(helmArgs);

  console.log('Done ✨', templateOutput);
};

void main();
