import express from 'express';
import { DataViewer } from 'src/main';

const getUsers = async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json();
const getPosts = async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json();

async function main() {

  const dataViewer = new DataViewer({
    path: '/viewer',
  });

  dataViewer.addHeader('User Table');
  dataViewer.addTable((await getUsers()));
  dataViewer.addHeader('Post Table');
  dataViewer.addTable(await getPosts());

  const app = express();
  dataViewer.registerMiddleware(app);
  app.listen(3000, async () => console.log(`Already servered on http://localhost:3000/viewer`));
}

main();
