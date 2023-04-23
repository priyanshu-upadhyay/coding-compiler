import { CACHE_MANAGER, Module } from '@nestjs/common';
import { CheckStatusController } from './check-status.controller';
import { CheckStatusService } from './check-status.service';
import { RedisModule } from '@app/common';

@Module({
  controllers: [CheckStatusController],
  providers: [CheckStatusService],
  imports: [RedisModule.register()]
})
export class CheckStatusModule {}
