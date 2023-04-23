import { Controller, Get } from '@nestjs/common';
import { RetrySubmissionService } from './retry-submission.service';

@Controller()
export class RetrySubmissionController {
  constructor(private readonly retrySubmissionService: RetrySubmissionService) {}

  @Get()
  getHello(): string {
    return this.retrySubmissionService.getHello();
  }
}
