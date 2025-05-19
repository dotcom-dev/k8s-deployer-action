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
  // TODO: determine KubeConfig path

  // TODO: determine Helm

  // TODO: add default repo

  // TODO: add repo

  // TODO: init in case Helm2

  const helm = await Helm.create();

  const dependencyUpdate = getInput('dependencyUpdate', { required: false });
  const namespace = getInput('namespace', { required: true });
  const releaseName = getInput('releaseName', { required: true });
  const wait = getInput('wait', { required: false });

  const defaultRepo = {
    name: 'dotcom',
    url: 'https://dotcom-dev.github.io/charts',
    chart: 'deployer',
  };

  let repoUrl = getInput('repoUrl', { required: false });
  if (!repoUrl) {
    repoUrl = defaultRepo.url;
  }

  let repoName = getInput('repoName', { required: false });
  if (!repoName) {
    repoName = defaultRepo.name;
  }

  let chart = getInput('chart', { required: false });
  if (!chart) {
    chart = `${defaultRepo.name}/${defaultRepo.chart}`;
  }

  await helm.addRepo(repoName, repoUrl);

  await helm.updateRepo();

  const helmArgs = [
    // 'template',
    'upgrade',
    '--install',
    `-n`,
    `${namespace}`,
    releaseName,
    chart,
  ];

  if (String(dependencyUpdate) === 'true') {
    helmArgs.push('--dependency-update');
  }

  if (wait != 'false') {
    helmArgs.push('--wait');
  }

  getValueFiles().forEach((file) => {
    helmArgs.push('-f');
    helmArgs.push(file);
  });

  getValues().forEach(({ name, value }) => {
    helmArgs.push('--set');
    helmArgs.push(`${name}=${value}`);
  });

  console.log('ℹ️ Helm Args', helmArgs);

  const templateOutput = await helm.exec(helmArgs);

  console.log('✨ Done', templateOutput);
};

void main();
