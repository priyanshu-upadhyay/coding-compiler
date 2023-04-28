import { Module } from '@nestjs/common';
import { BackendEngineController } from './backend-engine.controller';
import { BackendEngineService } from './backend-engine.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, DatabaseService, RedisModule, RmqModule } from '@app/common';
import * as Joi from 'joi';
import { DirectoryManager, DockerService } from './helpers';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionsFilter } from './exceptions';

@Module({
  imports: 
  [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI:  Joi.string().required(),
        RABBIT_MQ_CODE_EXECUTION_QUEUE: Joi.string().required(),
        RABBIT_MQ_PREFETCH: Joi.number(),   // Not making it mandatory, if not passed then based on ram we can calculate
        REDIS_URL: Joi.string().required(),
        REDIS_TTL: Joi.number().required(),
      }),
      envFilePath: '.env',
    }),
    RmqModule,
    DatabaseModule,
    RedisModule.register()
  ],
  controllers: [BackendEngineController],
  providers: 
  [
    BackendEngineService, 
    DatabaseService, 
    DockerService,
    DirectoryManager,
    { provide: APP_FILTER, useClass: GlobalExceptionsFilter}
  ]
})
export class BackendEngineModule {}
