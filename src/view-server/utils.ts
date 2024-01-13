import dayjs from 'dayjs';

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
  const supportedEncodings: BufferEncoding[] = ['utf8', 'utf-8', 'base64', 'base64url', 'binary', 'hex'];
  for (const bufferEncoding of supportedEncodings) {
    if (isEncoding(data, bufferEncoding)) {
      console.log(data.toString(bufferEncoding as BufferEncoding).length);
      return data.toString(bufferEncoding as BufferEncoding) + ' (' + bufferEncoding + ')';
    }
  }
  return data;
}

export function isEncoding(data: Buffer, encoding: BufferEncoding) {
  return data.toString(encoding) !== '' && data.toString(encoding) !== null && data.toString(encoding) !== undefined;
}

export function isBuffer(data: unknown): data is Buffer {
  return data instanceof Buffer;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
