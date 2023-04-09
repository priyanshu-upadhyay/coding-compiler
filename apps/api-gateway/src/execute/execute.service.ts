import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ExecuteRequest } from './types';
import { DatabaseService } from '@app/common';
import { toPrismaProgrammingLanguage } from './utils';
import { EXECUTION_SERVICE } from './constants/service';


@Injectable()
export class ExecuteService {
  constructor(private readonly db: DatabaseService,
  @Inject(EXECUTION_SERVICE) private executionClient: ClientProxy,
  ) {}
  
  async executor(request : ExecuteRequest) {
    const execute = await this.db.executionSubmissions.create({
      data: {
        typed_code: request.typed_code,
        data_input : request.input,
        programming_language : toPrismaProgrammingLanguage(request.programming_language)
      },
      // select: {
      //   submission_id : true,
      //   submission_status : true,
      // }
    })
    this.executionClient.emit('submission_created', execute)
    return execute;
  }
}

