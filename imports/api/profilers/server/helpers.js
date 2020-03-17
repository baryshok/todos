import os from 'os';

function getInstanceName() {
  return os.hostname();
}

export { getInstanceName };
