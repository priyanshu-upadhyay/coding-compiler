import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ExecuteRequest } from './types';
import { DatabaseService, EXECUTION_SERVICE, AppLogger } from '@app/common';
import { handleEmptyInputArray } from './utils';

@Injectable()
export class ExecuteService {
  private readonly logger = new AppLogger(ExecuteService.name);
  constructor(private readonly db: DatabaseService,
  @Inject(EXECUTION_SERVICE) private executionClient: ClientProxy
  ) {}
  
  async executor(request : ExecuteRequest) {
    const inputArray = handleEmptyInputArray(request.input_array);
    const execute = await this.db.executionSubmissions.create({
      data: {
        source_code  : request.source_code,
        input_array  : inputArray,
        programming_language : request.programming_language
      },
      select : {
        submission_id : true,
        programming_language : true,
        submission_status : true,
        date_created : true,
        date_modified : true
      }
    });
    this.executionClient.emit('submission_created', execute.submission_id);
    this.logger.info("Event triggered for backend-engine", {submission_id: execute.submission_id})
    return execute;
  }
}

