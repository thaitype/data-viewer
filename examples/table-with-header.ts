import dataViewer from 'src/main';

const getUsers = async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json();
const getPosts = async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json();

async function main() {

  dataViewer
    .addHeader('User Table')
    .addTable(await getUsers())
    .addHeader('Post Table')
    .addTable(await getPosts())
    .start();
}

main();
