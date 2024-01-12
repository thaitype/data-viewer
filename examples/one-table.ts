import { startViewServer } from 'src/view-server';

async function main() {
  const result = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
  startViewServer(result);
}

main();
