import { AppLogger } from '@app/common';
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';

@Catch()
export class GlobalExceptionsFilter extends BaseRpcExceptionFilter {
  private readonly logger = new AppLogger(GlobalExceptionsFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    this.logger.error("Global Microservice Error", exception)
    return super.catch(exception, host);
  }
}