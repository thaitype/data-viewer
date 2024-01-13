import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

import type { AllTableData, HeaderComponent, ServerOptions, TableComponent } from './types';

import { delay, format } from './utils';

export class DataViewer {
  private dataView: AllTableData[] = [];

  constructor(public option: ServerOptions = {}) {}

  public setOption(option: ServerOptions) {
    this.option = option;
    return this;
  }

  public addData(data: AllTableData) {
    this.dataView.push(data);
    return this;
  }

  public addTable(data: TableComponent['data']){
    this.dataView.push({type: 'table', data});
    return this;
  }
  
  public addHeader(data: HeaderComponent['data']){
    this.dataView.push({type: 'header', data});
    return this;
  }

  public clear(){
    this.dataView = [];
    return this;
  }

  public start(){
    startViewServer(this.dataView, this.option);
  }
}

export async function startViewServer(dataView: AllTableData[], option: ServerOptions = {}) {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);
  const port = option.port ?? 3030;
  const viewDirectory = option.viewDirectory ?? __dirname + '/views';

  let isClientConnected = false;

  io.on('connection', socket => {
    console.log('Client connected');
    isClientConnected = true;
  });

  // Set the custom path for EJS views
  app.set('views', viewDirectory);

  // Set the view engine to EJS
  app.set('view engine', 'ejs');

  // Middleware to add the formatDate function to locals
  app.use((req, res, next) => {
    res.locals.format = format;
    next();
  });

  // Define a route to render the HTML page
  app.get('/', (req, res) => {
    res.render('index', { dataView });
  });

  server.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
    while (!isClientConnected) {
      await delay(200);
    }
    io.emit('startReload');
  });
}

export const dataViewer = new DataViewer();