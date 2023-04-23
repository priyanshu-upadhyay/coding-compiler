import { Injectable } from '@nestjs/common';

@Injectable()
export class RetrySubmissionService {
  getHello(): string {
    return 'Hello World!';
  }
}
