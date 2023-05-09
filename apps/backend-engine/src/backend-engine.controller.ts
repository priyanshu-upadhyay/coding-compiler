import { BackendEngineService } from './backend-engine.service';
import { Controller, Inject,} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppLogger, DatabaseService, EMIT_SUBMISSION, RmqService } from '@app/common';
import { ExecutionSubmissions, SubmissionStatus } from '@prisma/client';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller()
export class BackendEngineController {
  private logger;
  constructor(private readonly backendEngineService: BackendEngineService,
    private readonly db: DatabaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly rmqService: RmqService) {}

  @EventPattern(EMIT_SUBMISSION)
  async handleSubmissionCreated(@Payload() submissionId : string, @Ctx() context: RmqContext) 
  {
    this.logger = new AppLogger(submissionId);
    try {
      await this.backendEngineService.executeSubmission(submissionId);
    } 
    catch (error) {
      this.logger.error("PROCESSING FAILED", error);
      const execute : ExecutionSubmissions = await this.db.executionSubmissions.update
      (
        { where  : { submission_id : submissionId }
        , data   : { submission_status : SubmissionStatus.FAILURE, metadata : JSON.stringify(error)}
        }
      );
      await this.cacheManager.set(execute.submission_id, execute);
    }
    await this.rmqService.ack(context);
  }
}