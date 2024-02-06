import express from 'express';
import { DataViewer } from 'src/main';
import { getPinoLogger } from 'src/logger';

const getUsers = async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json();
const getPosts = async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json();

const logger = getPinoLogger({
  level: 'debug'
});

const stringLogger = {
  log: (message: string) => logger.info(message),
  debug: (message: string) => logger.debug(message),
  info: (message: string) => logger.info(message),
  warn: (message: string) => logger.warn(message),
  error: (message: string) => logger.error(message),
};

async function main() {
  const dataViewer = new DataViewer({
    path: '/viewer',
    logger: stringLogger,
  });

  dataViewer.addHeader('User Table');
  dataViewer.addTable(await getUsers());
  dataViewer.addHeader('Post Table');
  dataViewer.addTable(await getPosts());

  const app = express();
  dataViewer.registerMiddleware(app);
  app.listen(3000, async () => logger.info(`Already servered on http://localhost:3000/viewer`));
}

main();
