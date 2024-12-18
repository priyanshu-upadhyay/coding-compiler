import { WinstonModule, utilities as nestWinstonModuleUtilities, } from 'nest-winston';
import { transports, format } from 'winston';
import { Injectable, Logger } from '@nestjs/common';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  createLogger(_appName) {
    return WinstonModule.createLogger({
      transports: [
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json(), format.printf((info) => {
            return `${JSON.stringify(info)}`
          })),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true, 
          maxFiles: '20d', // will keep log until they are older than 20 days
        }),

        new transports.DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(format.timestamp(), format.json(), format.printf((info) => {
            return `${JSON.stringify(info)}`
          })),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxFiles: '90d'
        }),

        new transports.Console({
          format: format.combine(format.timestamp(), format.json(), format.printf((info) => {
              return `${JSON.stringify(info)}\n`
            }),
          ),
        }),
      ],
    });
  }
}

export class AppLogger extends Logger {

  constructor(context?: string) {
    super(context);
  }

  info(tag: string, message ?: any) {
    super.log({message : message, tag : tag});
  }

  error(tag: string, message ?: any) {
    super.error({message : message, tag : tag});
  }

  warn(tag: string , message ?: any) {
    super.warn({message : message, tag : tag});
  }

  debug(tag: string, message ?: any) {
    super.debug({message : message, tag : tag});
  }

  verbose(tag: string, message ?: any) {
    super.verbose({message : message, tag : tag});
  }
}