import type { LoggerOptions } from 'pino';

import pino from 'pino';

export const getLogger = (option: LoggerOptions) =>
  pino({
    ...option,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
    ...(option.transport ?? {}),
  });
