import { dataViewer } from 'src/main';

async function main() {
  const result = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();

  dataViewer.addHeader('This is a header');
  dataViewer.addTable(result);
  dataViewer.addHeader('This is a header');
  dataViewer.addTable(result);
  dataViewer.start();
}

main();
