import { startViewServer } from 'src/view-server';

async function main() {
  const result = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
  startViewServer([
    {
      type: 'header',
      data: 'This is a header',
    },
    {
      type: 'table',
      data: result,
    },
    {
      type: 'header',
      data: 'This is a header',
    },
    {
      type: 'table',
      data: result,
    },
  ]);
}

main();
