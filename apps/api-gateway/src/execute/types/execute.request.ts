import { IsString, IsEnum, Length, IsArray, ArrayMinSize, ArrayMaxSize} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProgrammingLanguages } from '@prisma/client';

export class ExecuteRequest {
  @ApiProperty({
    enum: ProgrammingLanguages,
    description: 'The programming language of the source code',
  })
  @IsEnum(ProgrammingLanguages)
  programming_language: ProgrammingLanguages;

  @ApiProperty({
    description: '`BASE64` encoded source code',
  })
  @IsString()
  @Length(0, 1000000)
  source_code: string;

  @ApiProperty({
    description: 'Array of `BASE64` encoded input array of testcases for the source code',
  })
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(50)
  @Type(() => String)
  input_array: string[];
}
