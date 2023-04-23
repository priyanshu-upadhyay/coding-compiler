import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EXECUTION_SERVICE, LoggerService, RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger : new LoggerService().createLogger("backend-engine")});
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(EXECUTION_SERVICE), {inheritAppConfig: true});
  await app.startAllMicroservices();
}
bootstrap();