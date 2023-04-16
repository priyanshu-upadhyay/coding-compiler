import { ConfigService } from '@nestjs/config';
import { ProgrammingLanguages } from '@prisma/client';

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

interface ImageName {
  [key: string]: {
    type: string;
  };
}


export class ScriptGenerator {
  private readonly programmingLanguage: ProgrammingLanguages;
  private readonly configService : ConfigService;

  // Compilation and Execution
  private readonly compilation: Compilation = {
    CPP: {
      command: "g++ main.cpp -o exec",
    },
    JAVA: {
      command: "javac main.java",
    },
    C: {
      command: "gcc -Werror main.c -o exec",
    }
  };

  private readonly execution: Execution = {
    CPP: {
      command: "./exec",
    },
    JAVA: {
      command: "java main",
    },
    C: {
      command: "./exec",
    },
    PYTHON3: {
      command: "python3 main.py",
    },
  };

  public readonly fileExtension: FileExtension = {
    CPP: {
      type: ".cpp",
    },
    JAVA: {
      type: ".java",
    },
    C: {
      type: ".c",
    },
    PYTHON3: {
      type: ".py",
    },
  };

  public readonly imageName: ImageName = {
    CPP: {
      type: "cpp",
    },
    JAVA: {
      type: "java",
    },
    C: {
      type: "clang",
    },
    PYTHON3: {
      type: "python3",
    },
  };

  constructor(programmingLanguage: ProgrammingLanguages) {
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

  public getDockerImageName(): string {
    return this.imageName[this.programmingLanguage].type;
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

