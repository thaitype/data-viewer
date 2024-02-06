import dayjs from 'dayjs';
// import { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';

/**
 * Get the dirname of the current module (For ESM)
 * Ref: https://stackoverflow.com/a/64383997
 * https://byteofdev.com/posts/how-to-use-esm/#migrating-from-cjs-to-esm
 */
// export function getEsmDirname() {
//   return dirname(fileURLToPath(import.meta.url));
// }

const dateFormats = 'YYYY-MM-DD HH:mm:ss Z';

export function formatDate(date: Date) {
  return dayjs(date).format(dateFormats);
}

export function format(data: unknown) {
  if (data instanceof Date) {
    return formatDate(data);
  }
  if (isBuffer(data)) {
    return `B'${data.length} : ${parseBuffer(data)}`;
  }
  if (typeof data === 'object') {
    return JSON.stringify(data);
  }
  return data;
}

export function parseBuffer(data: Buffer) {
  return data.toString('hex');
}

export function isBuffer(data: unknown): data is Buffer {
  return data instanceof Buffer;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
