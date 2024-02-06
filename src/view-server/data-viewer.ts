import type express from 'express';

import path from 'node:path';

import type { DataViewerOptions, StartOptions } from './types';

import { format } from './utils';
import { consoleLogger } from '../logger';
import { startViewServer } from './server';
import { DataContainer } from './data-container';

export class DataViewer extends DataContainer {
  constructor(protected option: DataViewerOptions = {}) {
    super();
  }

  public getOption() {
    return this.option;
  }

  public setOption(option: DataViewerOptions) {
    this.option = option;
    return this;
  }

  public start(startOptions?: StartOptions) {
    startViewServer(this, startOptions);
  }

  public registerMiddleware(app: express.Express) {
    const logger = this.option.logger ?? consoleLogger;
    const viewPath = this.option.path ?? '/';
    const viewDirectory = this.option.viewDirectory ?? path.join(__dirname, 'views');
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
