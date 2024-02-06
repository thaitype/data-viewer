import type { LoggerOptions } from 'pino';

export interface TableComponent {
  type: 'table';
  data: (Record<string, unknown> | object)[];
}
export interface HeaderComponent {
  type: 'header';
  data: string;
}
export type AllTableData = TableComponent | HeaderComponent;

export interface ServerOptions {
  /**
   * The path to serve the view
   * @default '/'
   */
  path?: string;
  /**
   * The port to serve the view
   * @default 3030
   */
  port?: number;
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
   * Pino Logger options
   */
  logger?: LoggerOptions;
  /**
   * Override the default cell formatter
   */
  cellFormatter?: (data: unknown) => string;
}
