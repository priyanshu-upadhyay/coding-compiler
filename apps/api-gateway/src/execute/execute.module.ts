import { Module } from '@nestjs/common';
import { ExecuteController } from './execute.controller';
import { ExecuteService } from './execute.service';
import { RmqModule } from '@app/common';
import { EXECUTION_SERVICE } from './constants/service';


@Module({
  imports : [ RmqModule.register({
    name: EXECUTION_SERVICE,
  })],
  controllers: [ExecuteController],
  providers: [ExecuteService]
})
export class ExecuteModule {}
