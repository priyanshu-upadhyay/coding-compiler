import { Module } from '@nestjs/common';
import { CheckStatusController } from './check-status.controller';
import { CheckStatusService } from './check-status.service';

@Module({
  controllers: [CheckStatusController],
  providers: [CheckStatusService]
})
export class CheckStatusModule {}
