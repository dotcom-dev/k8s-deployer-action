import { execCommand } from './utils/fs';
import { Helm, obtainHelmPath } from './utils/helm';

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

  const runOutput = await helm.exec([
    'install',
    `-n ${namespace}`,
    defaultRepo.chart,
    releaseName,
    `${defaultRepo.name}/${defaultRepo.chart}`,
    '--dry-run',
  ]);

  console.log('Done ✨', runOutput);
};

void main();
