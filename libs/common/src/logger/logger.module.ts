import { Global, Module, Logger} from '@nestjs/common';
import { AppLogger, LoggerService } from './logger.service';

@Global()
@Module({
  providers: [Logger],
  exports: [LoggerService, AppLogger],
})
export class LoggerModule {}
