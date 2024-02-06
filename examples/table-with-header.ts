import dataViewer from 'src/main';

const getUsers = async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json();
const getPosts = async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json();

async function main() {
  dataViewer.setOption({
    enableLiveReload: false,
  })
    // .setOption({
    //   logger: {
    //     level: 'debug',
    //   },
    // })
    .addHeader('User Table')
    .addTable(await getUsers())
    .addHeader('Post Table')
    .addTable(await getPosts())
    .start();
}

main();
