import { NestFactory } from '@nestjs/core';
import { BackendEngineModule } from './backend-engine.module';
import { EXECUTION_SERVICE, LoggerService, RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BackendEngineModule, {logger : new LoggerService().createLogger("backend-engine")});
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(EXECUTION_SERVICE), {inheritAppConfig: true});
  await app.startAllMicroservices();
}
bootstrap();