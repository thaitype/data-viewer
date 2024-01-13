import dataViewer from 'src/main';

const getUsers = async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json();
const getPosts = async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json();

async function main() {
  dataViewer.addHeader('User Table');
  dataViewer.addTable((await getUsers()));
  dataViewer.addHeader('Post Table');
  dataViewer.addTable(await getPosts());
  dataViewer.start();
}

main();
