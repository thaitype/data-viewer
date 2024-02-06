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
  port?: number;
  viewDirectory?: string;
  /**
   * Pino Logger options
   */
  logger?: LoggerOptions;
  /**
   * Override the default cell formatter
   */
  cellFormatter?: (data: unknown) => string;
}
