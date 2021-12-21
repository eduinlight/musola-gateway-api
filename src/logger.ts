import logger from 'morgan';
import { Request, Response } from 'express';
import rfs from 'rotating-file-stream';

export const LOGS_PATH = 'logs/access.log';

logger.token('body', (req: Request) => 'BODY: ' + JSON.stringify(req.body));
logger.token(
  'params',
  (req: Request) => 'PARAMS: ' + JSON.stringify(req.params),
);

const loggerFormat = function (
  tokens: any,
  req: Request,
  res: Response,
): string {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    tokens['body'](req, res),
    tokens['params'](req, res),
  ].join(' ');
};

export const loggerMorgen = (env: string) =>
  env === 'production'
    ? logger(loggerFormat, {
        stream: rfs.createStream(LOGS_PATH, {
          size: '10M',
          interval: '1d',
          compress: 'gzip',
          maxFiles: 30,
        }),
      })
    : logger(loggerFormat);
