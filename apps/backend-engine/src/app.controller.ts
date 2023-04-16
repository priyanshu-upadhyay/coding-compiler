import { AppService } from './app.service';
import { Controller,} from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
              private readonly rmqService: RmqService) {}

  @MessagePattern('submission_created')
  async handleSubmissionCreated(@Payload() data: string, @Ctx() context: RmqContext) {
    await this.appService.executeSubmission(data);
    this.rmqService.ack(context);
  }

}
