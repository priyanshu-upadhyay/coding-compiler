import { AppLogger } from '@app/common';
import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class CronSchedulerController {  
  private readonly logger = new AppLogger(CronSchedulerController.name);
  constructor() {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async func() {
    this.logger.info("Compiler Services is Up - Priyanshu Upadhyay");
  }
}
