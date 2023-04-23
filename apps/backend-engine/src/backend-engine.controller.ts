import { BackendEngineService } from './backend-engine.service';
import { Controller,} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EMIT_SUBMISSION } from '@app/common';

@Controller()
export class BackendEngineController {
  constructor(private readonly backendEngineService: BackendEngineService) {}

  @EventPattern(EMIT_SUBMISSION)
  async handleSubmissionCreated(@Payload() submissionId : string, @Ctx() context: RmqContext) 
  {
    await this.backendEngineService.executeSubmission(submissionId);
  }
}