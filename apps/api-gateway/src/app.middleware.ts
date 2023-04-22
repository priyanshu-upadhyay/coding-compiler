import { AppLogger } from '@app/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private readonly logger = new AppLogger(RequestMiddleware.name);
  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl, body } = req;
    next();
    const { statusCode, header } = res;
    const logObj = {
      method,
      originalUrl,
      body,
      statusCode,
      header,
    };
    this.logger.info('INCOMING REQUEST', logObj);
  }
}
