import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ExecuteRequest } from './types';
import { DatabaseService, EXECUTION_SERVICE } from '@app/common';
import { handleEmptyInputArray } from './utils';

@Injectable()
export class ExecuteService {
  constructor(private readonly db: DatabaseService,
  @Inject(EXECUTION_SERVICE) private executionClient: ClientProxy,
  ) {}
  
  async executor(request : ExecuteRequest) {
    const inputArray = handleEmptyInputArray(request.input_array);
    const execute = await this.db.executionSubmissions.create({
      data: {
        source_code  : request.source_code,
        input_array  : inputArray,
        programming_language : request.programming_language
      },
      select: {
        submission_id : true,
        submission_status : true, 
      }
    })
    this.executionClient.emit('submission_created', execute.submission_id);
    return execute;
  }
}

