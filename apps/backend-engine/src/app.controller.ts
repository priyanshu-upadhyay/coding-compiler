import { AppService } from './app.service';
import { Controller,} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EMIT_SUBMISSION, RmqService } from '@app/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
              private readonly rmqService: RmqService) {}

  @EventPattern(EMIT_SUBMISSION)
  async handleSubmissionCreated(@Payload() data: string, @Ctx() context: RmqContext) {
    await this.appService.executeSubmission(data);
    this.rmqService.ack(context);
  }

}
