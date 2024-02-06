import dataViewer, { DataContainer } from 'src/main';

const getUsers = async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json();
const getPosts = async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json();

async function main() {
  const container = new DataContainer()
    .addHeader('User Table')
    .addTable(await getUsers())
    .addHeader('Post Table')
    .addTable(await getPosts());
  dataViewer.set(container).start();
}

main();
