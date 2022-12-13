import * as core from '@actions/core';

import { obtainHelmPath } from './utils/helm';

const main = async (): Promise<void> => {
  // TODO: determine kubeconfig path

  // TODO: determine Helm

  // TODO: add default repo

  // TODO: add repo

  console.log('Done ✨', await obtainHelmPath());
};

void main();
