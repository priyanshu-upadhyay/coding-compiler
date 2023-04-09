import { IsString, IsEnum, Length, IsArray, ArrayMinSize, ValidateNested, ArrayMaxSize} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

enum ProgrammingLanguages {
  CPP     = 'cpp',
  JAVA    = 'java',
  PYTHON3 = 'python3',
  NODEJS  = 'nodejs',
  C       = 'c',
}

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
  typed_code: string;

  @ApiProperty({
    description: 'Array of `BASE64` encoded user input for the source code',
  })
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(25)
  @Type(() => String)
  input: string[];
}
