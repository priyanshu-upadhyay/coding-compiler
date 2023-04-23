import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { RmqModule, EXECUTION_SERVICE, AppLogger, RedisModule } from '@app/common';

@Module({
  imports : [ RmqModule.register({
    name: EXECUTION_SERVICE,
  }),
  RedisModule.register()
],
  controllers: [SubmissionController],
  providers: [SubmissionService, AppLogger]
})
export class SubmissionModule {}
