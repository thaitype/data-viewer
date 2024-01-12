import { DataViewer } from 'src/main';

async function main() {
  const result = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
  const viewer = new DataViewer();

  viewer.addHeader('This is a header');
  viewer.addTable(result);
  viewer.addHeader('This is a header');
  viewer.addTable(result);
  viewer.start();
}

main();
