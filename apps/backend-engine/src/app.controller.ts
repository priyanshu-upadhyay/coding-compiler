import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('submission_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data);
    // console.log(this.appService.getHello());
    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log("Priyanshu")
    this.rmqService.ack(context);
  }

}
