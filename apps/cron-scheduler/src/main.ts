import { NestFactory } from '@nestjs/core';
import { CronSchedulerModule } from './cron-scheduler.module';
import { LoggerService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(CronSchedulerModule, {logger : new LoggerService().createLogger("cron-scheduler")});
  await app.init();
}
bootstrap();
