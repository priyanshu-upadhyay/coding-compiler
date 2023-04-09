

import { ProgrammingLanguages } from '@prisma/client';

export function toPrismaProgrammingLanguage(language : string) : ProgrammingLanguages
{
  switch (language) {
    case 'cpp':
      return ProgrammingLanguages.CPP;
    case 'java':
      return ProgrammingLanguages.JAVA;
    case 'python3':
      return ProgrammingLanguages.PYTHON3;
    case 'nodejs':
      return ProgrammingLanguages.NODEJS;
    case 'c':
      return ProgrammingLanguages.C;
  }
}