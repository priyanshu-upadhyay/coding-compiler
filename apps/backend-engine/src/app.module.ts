import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import * as Joi from 'joi';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      RABBIT_MQ_URI: Joi.string().required(),
      RABBIT_MQ_CODE_EXECUTION_QUEUE: Joi.string().required(),
    }),
    envFilePath: '.env',
  }),
  RmqModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
