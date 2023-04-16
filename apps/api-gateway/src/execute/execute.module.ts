import { Module } from '@nestjs/common';
import { ExecuteController } from './execute.controller';
import { ExecuteService } from './execute.service';
import { RmqModule, EXECUTION_SERVICE } from '@app/common';

@Module({
  imports : [ RmqModule.register({
    name: EXECUTION_SERVICE,
  })],
  controllers: [ExecuteController],
  providers: [ExecuteService]
})
export class ExecuteModule {}
