import type { Logger } from 'pino';

import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

import type { AllTableData, HeaderComponent, ServerOptions, TableComponent } from './types';

import { getLogger } from '../logger';
import { delay, format } from './utils';

export class DataViewer {
  private dataView: AllTableData[] = [];
  private logger: Logger;

  constructor(protected option: ServerOptions = {}) {
    this.logger = this.setupLogger(option);
  }

  public setupLogger(option: ServerOptions) {
    return getLogger(
      option.logger ?? {
        level: 'info',
        ...(option.logger ?? {}),
      }
    );
  }

  public setOption(option: ServerOptions) {
    this.option = option;
    this.logger = this.setupLogger(option);
    return this;
  }

  public addData(data: AllTableData) {
    this.dataView.push(data);
    return this;
  }

  public addTable(data: TableComponent['data']) {
    this.dataView.push({ type: 'table', data });
    return this;
  }

  public addHeader(data: HeaderComponent['data']) {
    this.dataView.push({ type: 'header', data });
    return this;
  }

  public clear() {
    this.dataView = [];
    return this;
  }

  public start() {
    startViewServer(this.dataView, this.option, this.logger);
  }
}

export async function startViewServer(dataView: AllTableData[], option: ServerOptions = {}, logger: Logger) {
  logger.debug('Starting view server');
  const app = express();
  logger.debug('Express app created');
  const server = createServer(app);
  logger.debug('HTTP server created');
  const io = new Server(server);
  logger.debug('Socket.IO server created');
  const port = option.port ?? 3030;
  logger.debug(`Config port: ${port}`);
  const viewDirectory = option.viewDirectory ?? __dirname + '/views';
  logger.debug(`Config viewDirectory: ${viewDirectory}`);
  let cellFormatter = option.cellFormatter ?? format;
  if(typeof option.cellFormatter === 'function'){
    logger.debug(`Config cellFormatter: Using custom cell formatter`);
  } else {
    logger.warn(`Config cellFormatter: Invalid cell formatter, using default cell formatter`);
    cellFormatter = format;
  }

  let isClientConnected = false;

  /**
   * Prevent duplicate 'connection' event
   * Store the session id of the connected client
   */
  const connectedClient = new Set<string>();
  const isClientConnectedBefore = (sessionId: string) => connectedClient.has(sessionId);
  const addClient = (sessionId: string) => connectedClient.add(sessionId);

  io.on('connection', async socket => {
    /**
     * Prevent duplicate 'join' event
     */
    socket.on('join', sessionId => {
      if (isClientConnectedBefore(sessionId)) {
        logger.debug(`Same client connected with: ${sessionId}`);
        return;
      } else {
        logger.info('Client connected');
        logger.debug(`Client connected with: ${sessionId}`);
        addClient(sessionId);
        isClientConnected = true;
        logger.debug('Prepare to emit startReload');
      }
    });
  });

  // Set the custom path for EJS views
  app.set('views', viewDirectory);

  // Set the view engine to EJS
  app.set('view engine', 'ejs');

  // Middleware to add the formatDate function to locals
  app.use((req, res, next) => {
    res.locals.format = cellFormatter;
    next();
  });

  // Define a route to render the HTML page
  app.get('/', (req, res) => {
    res.render('index', { dataView });
  });

  server.listen(port, async () => {
    logger.info(`Server is running at http://localhost:${port}`);
    while (!isClientConnected) {
      await delay(200);
    }
    io.emit('startReload');
    logger.debug('Start reload');
  });
}

export const dataViewer = new DataViewer();
