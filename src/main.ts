import * as core from '@actions/core';

import { execCommand } from './utils/fs';
import { Helm, obtainHelmPath } from './utils/helm';

type NameValuePair = {
  name: string;
  value: string;
};

const getOverrideValues = () => {
  const overridesValuesInput = core.getInput('overrideValues', {
    required: false,
  });

  const overrides = overridesValuesInput.split('\n');

  if (overrides.length < 1) {
    return [];
  }

  return overrides.reduce((overrideValues, override) => {
    const overrideComponents = override.split(':');

    overrideValues.push({
      name: overrideComponents[0],
      value: overrideComponents.slice(1).join(':'),
    });

    return overrideValues;
  }, [] as NameValuePair[]);
};

const main = async (): Promise<void> => {
  // TODO: determine kubeconfig path

  // TODO: determine Helm

  // TODO: add default repo

  // TODO: add repo

  const helm = await Helm.create();

  const v = await helm.exec(['version']);

  const namespace = 'test';
  const releaseName = 'testrelease';
  const defaultRepo = {
    name: 'gamote',
    url: 'https://gamote.github.io/charts',
    chart: 'deployer',
  };

  await helm.addRepo(defaultRepo.name, defaultRepo.url);

  // const runOutput = await helm.exec([
  //   'install',
  //   `-n ${namespace}`,
  //   '--dry-run',
  //   releaseName,
  //   `${defaultRepo.name}/${defaultRepo.chart}`,
  // ]);

  const helmArgs = [
    'template',
    `-n ${namespace}`,
    releaseName,
    `${defaultRepo.name}/${defaultRepo.chart}`,
  ];

  getOverrideValues().forEach((override) => {
    helmArgs.push('--set');
    helmArgs.push(`${override.name}=${override.value}`);
  });

  console.log('helmArgs', helmArgs);

  const templateOutput = await helm.exec(helmArgs);

  console.log('Done ✨', templateOutput);
};

void main();
