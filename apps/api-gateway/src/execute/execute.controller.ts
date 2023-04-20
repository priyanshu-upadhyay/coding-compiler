import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ExecuteService } from './execute.service';
import { ExecuteRequest } from './types';

@Controller('submit')
export class ExecuteController {
  constructor(private readonly ExecuteService: ExecuteService) {}
  
  @Post()
  @HttpCode(201)
  executor(@Body() request: ExecuteRequest) {
    return this.ExecuteService.executor(request);
  }
}
