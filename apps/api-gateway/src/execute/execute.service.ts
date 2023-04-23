import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ExecuteRequest, ExecuteResponse } from './types';
import { DatabaseService, EXECUTION_SERVICE, AppLogger, EMIT_SUBMISSION } from '@app/common';
import { handleEmptyInputArray, makeSubmitReponse } from './utils';
import { ExecutionSubmissions } from '@prisma/client';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ExecuteService {
  private readonly logger = new AppLogger(ExecuteService.name);
  constructor(private readonly db: DatabaseService,
  @Inject(EXECUTION_SERVICE) private executionClient: ClientProxy,
  @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  
  async executor(request : ExecuteRequest) : Promise<ExecuteResponse> {
    const inputArray = handleEmptyInputArray(request.input_array);
    const execute : ExecutionSubmissions = await this.db.executionSubmissions.create({
      data: {
        source_code  : request.source_code,
        input_array  : inputArray,
        programming_language : request.programming_language
      }
    });
    this.cacheManager.set(execute.submission_id, execute);
    const response: ExecuteResponse = makeSubmitReponse(execute)
    this.executionClient.emit(EMIT_SUBMISSION, execute.submission_id);
    this.logger.info("Event triggered for backend-engine", {submission_id: execute.submission_id})
    return response;
  }
}