import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {logger : new LoggerService().createLogger("api-gateway")} );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);
  await app.listen(configService.get('API_GTAEWAY_PORT'));
}
bootstrap();
