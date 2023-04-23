import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SubmissionRequest, SubmissionResponse } from './types';
import { DatabaseService, EXECUTION_SERVICE, AppLogger, EMIT_SUBMISSION } from '@app/common';
import { handleEmptyInputArray, makeSubmitReponse } from './utils';
import { ExecutionSubmissions } from '@prisma/client';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class SubmissionService {
  private readonly logger = new AppLogger(SubmissionService.name);
  constructor(private readonly db: DatabaseService,
  @Inject(EXECUTION_SERVICE) private executionClient: ClientProxy,
  @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  
  async submitter(request : SubmissionRequest) : Promise<SubmissionResponse> {
    const inputArray = handleEmptyInputArray(request.input_array);
    const submission : ExecutionSubmissions = await this.db.executionSubmissions.create({
      data: {
        source_code  : request.source_code,
        input_array  : inputArray,
        programming_language : request.programming_language
      }
    });
    this.cacheManager.set(submission.submission_id, submission);
    const response: SubmissionResponse = makeSubmitReponse(submission)
    this.executionClient.emit(EMIT_SUBMISSION, submission.submission_id);
    this.logger.info("Event triggered for backend-engine", submission.submission_id)
    return response;
  }
}