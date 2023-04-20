import { Global, Module, Logger } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [DatabaseService, Logger],
  exports: [DatabaseService],
})
export class DatabaseModule {}
