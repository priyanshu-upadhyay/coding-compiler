import { ConfigService } from '@nestjs/config';
import { ProgrammingLanguages } from '@prisma/client';

type LanguageUtils = {
  [key in ProgrammingLanguages]: {
    compilation : string | null;
    execution   : string;
    extension   : string;
    dockerImage : string;
  };
};

export class ScriptGenerator {
  private readonly programmingLanguage: ProgrammingLanguages;
  private readonly configService : ConfigService;

  constructor(programmingLanguage: ProgrammingLanguages) {
    this.programmingLanguage = programmingLanguage;
    this.configService = new ConfigService;
  }

  // Compilation and Execution
  private readonly languageUtils: LanguageUtils = {
    CPP : {
      compilation : "g++ main.cpp -o exec",
      execution   : "./exec",
      extension   : ".cpp",
      dockerImage : "cpp",
    },
    JAVA: {
      compilation : "javac main.java",
      execution   : "java main",
      extension   : ".java",
      dockerImage : "java"
    },
    C: {
      compilation : "gcc -Werror main.c -o exec",
      execution   : "./exec",
      extension   : ".c",
      dockerImage : "clang"
    },
    PYTHON3: {
      compilation : null,
      execution   : "python3 main.py",
      extension   : ".py",
      dockerImage : "python3"
    }
  };

  private isCompilationSupportedLanguage(): boolean {
    return (this.languageUtils[this.programmingLanguage] != null);
  }

  private getCompilationCommand(): string {
    return this.languageUtils[this.programmingLanguage].compilation;
  }

  private getExecutionCommand(): string {
    return this.languageUtils[this.programmingLanguage].execution;
  }

  private getTimeLimit(): string {
    return this.configService.get<string>('TIME_LIMIT') || "1s";
  }

  private getStackMemoryLimit(): string {
    // This is equal to 250 MB (MegaBytes)
    return this.configService.get<string>('MEMORY_LIMIT') || "256000";
  }

  private getOutputFileSizeLimit(): string {
    // This is equals to 10 MB (MegaBytes) (10 * 1024)
    return this.configService.get<string>('MEMORY_LIMIT') || "10240";
  }

  public getFileExtension(): string {
    return this.languageUtils[this.programmingLanguage].extension;
  }

  public getDockerImageName(): string {
    return this.languageUtils[this.programmingLanguage].dockerImage;
  }

  public getEndpointFileContent() : string      // File that will execute inside container
  {
    let content: string = "#!/usr/bin/env bash\n";

    if(this.isCompilationSupportedLanguage()){
      content += `${this.getCompilationCommand()} 2> result/compilation_error.out\nret=$?\nif [ $ret -ne 0 ]\nthen\n  exit 2\nfi`
    }

    content += `\n\nn=$1     #Number of Testcases\n\nfor i in $(seq 1 $n)\ndo\n    ulimit -s ${this.getStackMemoryLimit()} -f ${this.getOutputFileSizeLimit}\n    timeout ${this.getTimeLimit()} ${this.getExecutionCommand()} < testcase\${i}.in &> result/output\${i}.out                 # &> is used to standard output and standard error output\n    ret=$?\n    if [ $ret -eq 0 ]; then\n      echo 0 >> result/status.out\n    elif [ $ret -eq 1 ]; then\n      echo 1 >> result/status.out\n    elif [ $ret -eq 139 ]; then\n      rm result/output\${i}.out\n      echo 2 >> result/status.out\n    elif [ $ret -eq 124 ]; then\n      rm result/output\${i}.out\n      echo 3 >> result/status.out\n    elif [ $ret -eq 153 ]; then\n      rm result/output\${i}.out\n      echo 4 >> result/status.out\n    else\n      echo 5 >> result/status.out\n  fi\ndone`

    return content;
  }
}

// 0 -> SUCCESSFUL_EXECUTION 1 -> RUNTIME_ERROR 2 -> MEMORY_LIMIT_EXCEEDED 3 -> TIME_LIMIT_EXCEEDED 4 -> OUTPUT_LIMIT_REACHED 5 -> UNKNOWN_EXECUTION_ERROR

