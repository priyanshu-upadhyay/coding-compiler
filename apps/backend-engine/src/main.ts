import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService, RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger : new LoggerService().createLogger("backend-engine")});
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('CODE_EXECUTION'), {inheritAppConfig: true});
  await app.startAllMicroservices();
}
bootstrap();