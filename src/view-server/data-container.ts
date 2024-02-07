import type { AllTableData, HeaderComponent, TableComponent } from './types';

export class DataContainer {
  protected dataView: AllTableData[] = [];

  set(container: DataContainer) {
    this.dataView = container.get();
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

  get() {
    return this.dataView;
  }
}
