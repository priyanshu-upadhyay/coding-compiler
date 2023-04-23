import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubmissionModule } from './submission/submission.module';
import { CheckStatusModule } from './status/status.module';
import { DatabaseModule, RedisModule } from '@app/common';
import * as Joi from 'joi';
import { RequestMiddleware } from './api-gateway.middleware';

@Module({
  providers: [RequestMiddleware],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        API_GTAEWAY_PORT: Joi.number().required(),
        REDIS_URL: Joi.string().required(),
        REDIS_TTL: Joi.number().required(),
      }),
      envFilePath: '.env',
    }),
    SubmissionModule,
    CheckStatusModule,
    DatabaseModule,
    RedisModule.register()
  ],
})
export class ApiGatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}