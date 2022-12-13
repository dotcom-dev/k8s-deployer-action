import { execCommand } from './utils/fs';
import { obtainHelmPath } from './utils/helm';

const main = async (): Promise<void> => {
  // TODO: determine kubeconfig path

  // TODO: determine Helm

  // TODO: add default repo

  // TODO: add repo

  const helmPath = await obtainHelmPath();

  const v = await execCommand(helmPath, ['version', '--client']);

  console.log('Done ✨', v);
};

void main();
