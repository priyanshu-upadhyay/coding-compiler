import { Injectable } from '@nestjs/common';
import { ProgrammingLanguageUtils } from './utils'; 

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    const programmingLanguageUtils = new ProgrammingLanguageUtils("cpp");
    return programmingLanguageUtils.getEndpointFileContent();
    // return 'Hello World!';
  }
}
