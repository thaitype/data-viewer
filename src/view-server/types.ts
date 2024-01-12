
export interface TableComponent {
  type: 'table';
  data: Record<string, unknown>[];
}
export interface HeaderComponent {
  type: 'header';
  data: string;
}
export type AllTableData = TableComponent | HeaderComponent;
