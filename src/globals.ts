/**
 * Thank you example from: https://github.com/google/zx/blob/main/src/globals.ts
 */

import * as _ from './main.js';
// eslint-disable-next-line no-undef
Object.assign(global, _);

declare global {
  type DataViewer = _.DataViewer;
  const $dataViewer: typeof _.dataViewer;
}
