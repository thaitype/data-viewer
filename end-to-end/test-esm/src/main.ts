import { DataViewer } from '@thaitype/data-viewer-server';

function main() {
  return new DataViewer()
    .addHeader('User Table')
    .start();
}

export default main();

