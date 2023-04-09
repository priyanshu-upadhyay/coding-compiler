import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExecuteModule } from './execute/execute.module';
import { CheckStatusModule } from './check-status/check-status.module';
import { DatabaseModule, RmqModule } from '@app/common';
import * as Joi from 'joi';
import { EXECUTION_SERVICE } from './execute/constants/service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        API_GTAEWAY_PORT: Joi.number().required(),
      }),
      envFilePath: '.env',
    }),
    ExecuteModule,
    CheckStatusModule,
    DatabaseModule,
  ],
})
export class AppModule {}