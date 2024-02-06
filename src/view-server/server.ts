import type { Logger } from 'pino';

import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

import type { DataViewer } from './data-viewer';

import { delay } from './utils';

export async function startViewServer(dataViewer: DataViewer, logger: Logger) {
  const viewerOption = dataViewer.getOption();
  logger.debug('Starting view server');
  const app = express();
  logger.debug('Express app created');
  const server = createServer(app);
  logger.debug('HTTP server created');
  const io = new Server(server);
  logger.debug('Socket.IO server created');
  const port = viewerOption.port ?? 3030;
  logger.debug(`Config port: ${port}`);
  // const viewDirectory = viewerOption.viewDirectory ?? __dirname + '/views';
  // logger.debug(`Config viewDirectory: ${viewDirectory}`);
  // let cellFormatter = option.cellFormatter ?? format;
  // if (typeof option.cellFormatter === 'function') {
  //   logger.debug(`Config cellFormatter: Using custom cell formatter`);
  // } else if (option.cellFormatter !== undefined) {
  //   logger.warn(`Config cellFormatter: Invalid cell formatter, using default cell formatter`);
  //   cellFormatter = format;
  // }

  let isClientConnected = false;

  /**
   * Prevent duplicate 'connection' event
   * Store the session id of the connected client
   */
  const connectedClient = new Set<string>();
  const isClientConnectedBefore = (sessionId: string) => connectedClient.has(sessionId);
  const addClient = (sessionId: string) => connectedClient.add(sessionId);
  const removeClient = (sessionId: string) => connectedClient.delete(sessionId);

  io.on('connection', async socket => {
    /**
     * Prevent duplicate 'join' event
     */
    socket.on('join', sessionId => {
      if (isClientConnectedBefore(sessionId)) {
        logger.debug(`Same client connected with: ${sessionId}`);
        removeClient(sessionId);
        logger.debug(`Remove client with: ${sessionId}`);
        return;
      } else {
        logger.info('Client connected');
        logger.debug(`Client connected with: ${sessionId}`);
        addClient(sessionId);
      }
      isClientConnected = true;
      logger.debug('Prepare to emit startReload');
    });
  });

  dataViewer.registerMiddleware(app);

  // // Set the custom path for EJS views
  // app.set('views', viewDirectory);

  // // Set the view engine to EJS
  // app.set('view engine', 'ejs');

  // // Middleware to add the formatDate function to locals
  // app.use((req, res, next) => {
  //   res.locals.format = cellFormatter;
  //   next();
  // });

  // // Define a route to render the HTML page
  // app.get('/', (req, res) => {
  //   res.render('index', { dataView });
  // });

  server.listen(port, async () => {
    logger.info(`Server is running at http://localhost:${port}`);
    while (!isClientConnected) {
      await delay(200);
    }
    io.emit('startReload');
    logger.debug('Start reload');
  });
}
