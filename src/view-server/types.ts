import type { LoggerOptions } from 'pino';

export interface TableComponent {
  type: 'table';
  data: Record<string, unknown>[];
}
export interface HeaderComponent {
  type: 'header';
  data: string;
}
export type AllTableData = TableComponent | HeaderComponent;

export interface ServerOptions {
  port?: number;
  viewDirectory?: string;
  logger?: LoggerOptions;
}
