import type express from 'express';

import type { AllTableData, HeaderComponent, DataViewerOptions, TableComponent, StartOptions } from './types';

import { format } from './utils';
import { consoleLogger } from '../logger';
import { startViewServer } from './server';

export class DataViewer {
  private dataView: AllTableData[] = [];

  constructor(protected option: DataViewerOptions = {}) {}

  public getOption() {
    return this.option;
  }

  public setOption(option: DataViewerOptions) {
    this.option = option;
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

  public start(startOptions?: StartOptions) {
    startViewServer(this, startOptions);
  }

  public registerMiddleware(app: express.Express) {
    const logger = this.option.logger ?? consoleLogger;
    const viewPath = this.option.path ?? '/';
    const viewDirectory = this.option.viewDirectory ?? __dirname + '/views';
    logger.debug(`Config viewDirectory: ${viewDirectory}`);
    let cellFormatter = this.option.cellFormatter ?? format;
    if (typeof this.option.cellFormatter === 'function') {
      logger.debug(`Config cellFormatter: Using custom cell formatter`);
    } else if (this.option.cellFormatter !== undefined) {
      logger.warn(`Config cellFormatter: Invalid cell formatter, using default cell formatter`);
      cellFormatter = format;
    }
    const enableLiveReload = this.option.enableLiveReload ?? false;

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
    app.get(viewPath, (req, res) => {
      res.render('index', { dataView: this.dataView, enableLiveReload });
    });
  }
}

export const dataViewer = new DataViewer();
