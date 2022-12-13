import { execCommand } from './utils/fs';
import { Helm, obtainHelmPath } from './utils/helm';

const main = async (): Promise<void> => {
  // TODO: determine kubeconfig path

  // TODO: determine Helm

  // TODO: add default repo

  // TODO: add repo

  const helm = await Helm.create();

  const v = await helm.exec(['version']);

  const addrep = await helm.addRepo(
    'gamote',
    'https://gamote.github.io/charts'
  );

  console.log('Done ✨', addrep);
};

void main();
