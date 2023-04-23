import { Module } from '@nestjs/common';
import { CronSchedulerController } from './cron-scheduler.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [CronSchedulerController],
})
export class CronSchedulerModule {}
