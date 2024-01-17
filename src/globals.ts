/**
 * Thank you example from: https://github.com/google/zx/blob/main/src/globals.ts
 */

import * as _ from './main';

Object.assign(global, _);

declare global {
  type DataViewer = _.DataViewer;
  const $dataViewer: typeof _.dataViewer;
}
