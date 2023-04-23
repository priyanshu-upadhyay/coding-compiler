import { Module } from '@nestjs/common';
import { RetrySubmissionController } from './retry-submission.controller';
import { RetrySubmissionService } from './retry-submission.service';

@Module({
  imports: [],
  controllers: [RetrySubmissionController],
  providers: [RetrySubmissionService],
})
export class RetrySubmissionModule {}
