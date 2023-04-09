import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

enum SupportedLanguages {
  PYTHON3 = 'python3',
  CPP = 'cpp',
  JAVA = 'java',
  CLANG = 'clang',
}

interface Compilation {
  [key: string]: {
    command: string;
  };
}

interface Execution {
  [key: string]: {
    command: string;
  };
}

interface FileExtension {
  [key: string]: {
    type: string;
  };
}

@Injectable()
export class ProgrammingLanguageUtils {
  private readonly programmingLanguage: string;
  private readonly configService : ConfigService;

  // Compilation and Execution
  private readonly compilation: Compilation = {
    cpp: {
      command: "g++ main.cpp -o exec",
    },
    java: {
      command: "javac main.java",
    },
    clang: {
      command: "gcc -Werror main.c -o exec",
    },
    python3: {
      command: "python3 main.py",
    },
  };

  private readonly execution: Execution = {
    cpp: {
      command: "./exec",
    },
    java: {
      command: "java main",
    },
    clang: {
      command: "./exec",
    },
    python3: {
      command: "python3 main.py",
    },
  };

  public readonly fileExtension: FileExtension = {
    cpp: {
      type: ".cpp",
    },
    java: {
      type: ".java",
    },
    clang: {
      type: ".c",
    },
    python3: {
      type: ".py",
    },
  };

  constructor(programmingLanguage: string) {
    this.programmingLanguage = programmingLanguage;
    this.configService = new ConfigService;
  }

  private isCompilationSupportedLanguage(): boolean {
    return this.programmingLanguage in this.compilation;
  }

  private getCompilationCommand(): string {
    return this.compilation[this.programmingLanguage].command;
  }

  private getExecutionCommand(): string {
    return this.execution[this.programmingLanguage].command;
  }

  private getTimeLimit(): string {
    return this.configService.get<string>('TIME_LIMIT') || "1s";
  }

  private getMemoryLimit(): string {
    return this.configService.get<string>('MEMORY_LIMIT') || "250";
  }

  public getFileExtension(): string {
    return this.fileExtension[this.programmingLanguage].type;
  }

  public getEndpointFileContent() : string      // File that will execute inside container
  {
    let content: string = "#!/usr/bin/env bash\n";

    if(this.isCompilationSupportedLanguage()){
      content += `${this.getCompilationCommand()} 2> compilation_error.out\nret=$?\nif [ $ret -ne 0 ]\nthen\n  exit 2\nfi`
    }

    content += `\n\nn=$1     #Number of Testcases\n\nfor i in $(seq 1 $n)\ndo\n    ulimit -s ${this.getMemoryLimit()}\n    timeout ${this.getTimeLimit()} ${this.getExecutionCommand()} < testcase\${i}.in &> output\${i}.out                 # &> is used to standard output and standard error output\n    ret=$?\n    if [ $ret -eq 0 ]; then\n      echo 0 >> status.out\n    elif [ $ret -eq 1 ]; then\n      echo 1 >> status.out\n    elif [ $ret -eq 139 ]; then\n      rm output\${i}.out\n      echo 2 >> status.out\n    elif [ $ret -eq 124 ]; then\n      rm output\${i}.out\n      echo 3 >> status.out\n    else\n      echo 4 >> status.out\n  fi\ndone`

    return content;
  }
}

// 0 -> SUCCESSFUL_EXECUTION 1 -> RUNTIME_ERROR 2 -> MEMORY_LIMIT_EXCEEDED 3 -> TIME_LIMIT_EXCEEDED 4 -> UNKONOWN_ERROR

