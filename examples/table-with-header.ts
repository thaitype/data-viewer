import dataViewer from 'src/main';

const getUsers = async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json();
const getPosts = async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json();

async function main() {
  dataViewer.setOption({
    logger: {
      level: 'debug'
    }
  })
  // dataViewer.addHeader('User Table');
  // dataViewer.addTable((await getUsers()));
  // dataViewer.addHeader('Post Table');
  // dataViewer.addTable(await getPosts());
  dataViewer.addTable([
    {
      id: 1,
      buffer: Buffer.from('Hello, UTF-8', 'utf8')
    },
    {
      id: 2,
      buffer: Buffer.from('x', 'base64')
    }
  ]);

  console.log(Buffer.from('Hello, World', 'utf8'));

  dataViewer.start();
}

main();
