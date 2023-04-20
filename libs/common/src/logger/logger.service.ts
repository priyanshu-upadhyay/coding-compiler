import { WinstonModule, utilities as nestWinstonModuleUtilities, } from 'nest-winston';
import { transports, format } from 'winston';
import { Injectable, Logger } from '@nestjs/common';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  createLogger() {
    return WinstonModule.createLogger({
      transports: [
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json(), format.printf((info) => {
            return `{${info.timestamp}, ${JSON.stringify(info)}}`;
          })),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false, 
          maxFiles: '10d', // will keep log until they are older than 10 days
        }),

        new transports.DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(format.timestamp(), format.json(), format.printf((info) => {
            return `{${info.timestamp}, ${JSON.stringify(info)}}`;
          })),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '10d'
        }),

        new transports.Console({
          format: format.combine(
            // format.cli(),
            // format.splat(),
            format.timestamp({
              format: () => {
                return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
              },
            }),
            format.printf((info) => {
              // return `${info.timestamp} ${info.level} : ${info.message}`;
              return `{${info.timestamp}, ${JSON.stringify(info)}}`
            }),
            nestWinstonModuleUtilities.format.nestLike('Compiler', {
              colors: true,
              // prettyPrint: true
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

  info(message: string, value : any) {
    super.log({"message" : message, value : value});
  }

  error(message: string, value : any) {
    super.error({"message" : message, value : value});
  }

  warn(message: string, value : any) {
    super.warn({"message" : message, value : value});
  }

  debug(message: string, value : any) {
    super.debug({"message" : message, value : value});
  }

  verbose(message: string, value : any) {
    super.verbose({"message" : message, value : value});
  }
}