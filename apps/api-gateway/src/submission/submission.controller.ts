import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionRequest } from './types';

@Controller('submit')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}
  
  @Post()
  @HttpCode(201)
  submitter(@Body() request: SubmissionRequest) {
    return this.submissionService.submitter(request);
  }
}
