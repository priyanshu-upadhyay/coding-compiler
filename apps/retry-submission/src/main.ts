import { NestFactory } from '@nestjs/core';
import { RetrySubmissionModule } from './retry-submission.module';

async function bootstrap() {
  const app = await NestFactory.create(RetrySubmissionModule);
  await app.listen(3000);
}
bootstrap();
