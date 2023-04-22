import { Controller, Get, Param } from '@nestjs/common';
import { CheckStatusService } from './check-status.service';

@Controller('status')
export class CheckStatusController {
  constructor(private readonly checkStatusService: CheckStatusService) {}
  
  @Get(':id([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})')
  checkSubmissionStatus(@Param('id') submissionId: string) {
    return this.checkStatusService.submissionStatus(submissionId);
  }
}
