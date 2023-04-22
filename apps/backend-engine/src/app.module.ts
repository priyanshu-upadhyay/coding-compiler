import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppLogger, DatabaseModule, DatabaseService, RmqModule } from '@app/common';
import * as Joi from 'joi';
import { DirectoryManager, DockerService } from './helpers';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionsFilter } from './exceptions';
import { Logger } from 'winston';

@Module({
  imports: 
  [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI:  Joi.string().required(),
        RABBIT_MQ_CODE_EXECUTION_QUEUE: Joi.string().required(),
        RABBIT_MQ_PREFETCH: Joi.number().required(),
      }),
      envFilePath: '.env',
    }),
    RmqModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: 
  [
    AppService, 
    DatabaseService, 
    DockerService,
    DirectoryManager,
    { provide: APP_FILTER, useClass: GlobalExceptionsFilter}
  ]
})
export class AppModule {}
