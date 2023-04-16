import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('CODE_EXECUTION'), {inheritAppConfig: true});
  await app.startAllMicroservices();
}
bootstrap();