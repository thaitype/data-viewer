// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import * as _ from './main';

declare global {
  type DataViewer = _.DataViewer;
  const $dataViewer: typeof _.dataViewer;
}
