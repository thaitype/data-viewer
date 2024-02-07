import type { LoggerOptions } from 'pino';

import type { Logger } from '../logger';

export interface TableComponent {
  type: 'table';
  data: (Record<string, unknown> | object)[];
}
export interface HeaderComponent {
  type: 'header';
  data: string;
}
export type AllTableData = TableComponent | HeaderComponent;

export interface DataViewerOptions {
  /**
   * The path to serve the view
   * @default '/'
   */
  path?: string;
  /**
   * The directory to serve the view
   * @default ' __dirname + '/views''
   */
  viewDirectory?: string;
  /**
   * Enable live reload
   * @default false
   */
  enableLiveReload?: boolean;
  /**
   * Custom Logger
   *
   * @default console
   */
  logger?: Logger;
  /**
   * Override the default cell formatter
   */
  cellFormatter?: (data: unknown) => string;
}

export interface StartOptions {
  /**
   * Pino Logger options
   */
  loggerOption?: LoggerOptions;
  /**
   * The port to serve the view
   * @default 3030
   */
  port?: number;
}
